import axios from "axios";
import jwt from 'jwt-decode';
const API_URL = "http://localhost:3000/api/v1/auth";

class AuthService {

  login(mail, password) {
    return axios
      .post(API_URL+"/login", {
        "mail":mail,
        "password":password
      })
      .then(response => {
        if (response.data.token) {
            const user = jwt(response.data.token); 
            localStorage.setItem("role",user.role[0]);
            localStorage.setItem("id",user.id);
            localStorage.setItem("token", response.data.token);
        }
        console.log(localStorage.getItem("token"));
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("facility_code");
    localStorage.removeItem("roleid");
  }

  getRoleId()
  {
    return axios.get(API_URL+"/me", {
      headers: {
        "x-access-token": this.getCurrentToken()
      }}).then(response => {
        console.log(response.data);
        
        if(response.data.role[0] === "facility" || response.data.role[0] ==="avis")
        {
          localStorage.setItem("facility_code",JSON.stringify(response.data._id));
        }
        else
        {
          localStorage.setItem("facility_code",JSON.stringify(response.data.facility_code));

            if(response.data.role[0] === "donor")
            {
              localStorage.setItem("blood_group",response.data.blood_group);
            }
            else
            {
              localStorage.setItem("start_hour",response.data.start_hour);
              localStorage.setItem("end_hour",response.data.end_hour);
              localStorage.setItem("working_days",response.data.working_days);
              console.log(localStorage.getItem("working_days"));
            }
          }
          
          localStorage.setItem("name", JSON.stringify(response.data.name));
          localStorage.setItem("roleid",JSON.stringify(response.data._id));
      })
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentId() 
  {    
    return localStorage.getItem('id');
  }

  getCurrentRole()
  {
    if(localStorage.getItem('role'))
    {
      return localStorage.getItem('role');
    }
    else
    {
      return "notauth";
    }
    
  }

  getCurrentName()
  {
    var name = localStorage.getItem('name');
    if(name === null)
    {
      return null;
    } 
    return name.replace(/['"]+/g, '');  }

  getCurrentToken()
  {
    var token = localStorage.getItem('token');
    if(token === null)
    {
      return null;
    } 
    return token.replace(/['"]+/g, '');
  }

  getCurrentRoleId()
  {
    var role = localStorage.getItem('roleid');
    if(role === null)
    {
      return null;
    } 
    return role.replace(/['"]+/g, '');
  }

  getCurrentFacilityCode()
  {
    var facility = localStorage.getItem('facility_code');
    return facility.replace(/['"]+/g, '');
  }

  getCurrentBloodGroup()
  {
    var blood = localStorage.getItem('blood_group');
    if(blood === null)
    {
      return null;
    } 
    return localStorage.getItem('blood_group');
  }

  getCurrentStartHour()
  {
    var start = localStorage.getItem('start_hour');
    if(start === null)
    {
      return null;
    } 
    return localStorage.getItem('start_hour');
  }
  getCurrentEndHour()
  {
    var end = localStorage.getItem('end_hour');
    if(end === null)
    {
      return null;
    } 
    return end.replace(/['"]+/g, '');
  }
  getCurrentWorkingDays()
  {
    var days = localStorage.getItem('working_days');
    if(days === null)
    {
      return null;
    } 
    return days.replace(/['"]+/g, '');
  }

}

export default new AuthService();