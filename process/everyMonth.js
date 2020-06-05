const donorService = require("./../services/donorService");

exports.remindDonation = async () => {
    const donor = await donorService.getAllPopulatedDonors();
    const avaiableDonor = donor.filter(donorService.donorCanDonate).map(user => user.user_id.mail);
    console.log("==================================")
    console.log("Montly automated process");
    console.log("contacting the following donors to remind donations...");
    console.log(avaiableDonor);

};