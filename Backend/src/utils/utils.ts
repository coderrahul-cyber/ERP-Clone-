

// making the randam 6 digit id starting woth ST in start

export const UserIdGenerator = ():string =>{
 const randomNumber = Math.floor(1000 + Math.random() * 9000)
 return  `ST28${randomNumber}`
}

// function for converting the dob in day/month/year format

export const formatDOB = (dob : Date | string | undefined) : string =>{
    if (!dob) {
        throw new Error("Invalid date: Date of birth is undefined");
      }
    const date = typeof dob === "string" ? new Date(dob) : dob;
    const day = String(date.getDate()).padStart(2,"0");
    const month = String(date.getMonth()+1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`
}

// funstion genrating the email for clooege
export const  genrateCollegeEmail = ({name , userId} : {name : string | undefined , userId :string}):string=>{
 
    if(!name) throw new Error("Name is not present")

    const cemail = `${name.trim().slice(0,4).toUpperCase()}${userId.slice(2)}`
    return `${cemail}@gehu.ac`; 

}