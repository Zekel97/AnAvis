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
            const user = jwt(response.data.token); // decode your token here      
            localStorage.setItem("role",user.role[0]);
            localStorage.setItem("id",user.id);
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  }

  getRoleId()
  {
    return axios.get(API_URL+"/me", {
      headers: {
        "x-access-token": this.getCurrentToken()
      }}).then(response => {
        console.log(JSON.stringify(response.data));
        if(JSON.stringify(response.data.role[0]) === "facility")
        {
          localStorage.setItem("facility_code",JSON.stringify(response.data._id));
        }
        else
        {
          localStorage.setItem("facility_code",JSON.stringify(response.data.facility_code));
        }
        

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

  getCurrentToken()
  {
    var token = localStorage.getItem('token');
    
    return token.replace(/['"]+/g, '');
  }

  getCurrentRoleId()
  {
    var role = localStorage.getItem('roleid');
    
    return role.replace(/['"]+/g, '');
  }

  getCurrentFacilityCode()
  {
    var facility = localStorage.getItem('facility_code');
    
    return facility.replace(/['"]+/g, '');
  }

}

export default new AuthService();