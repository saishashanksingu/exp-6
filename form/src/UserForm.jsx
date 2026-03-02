import { useState } from "react";

function UserForm(){
    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        gender:"",
        dob:"",
        age:"",
        skills:[],
        address:"",
        state:""
    });

    const todayDate = new Date().toISOString().split("T")[0];
    const calculateAge=(dob)=>{
        const birthDate=new Date(dob);
        const today=new Date();
        
        if (birthDate > today) {
        alert("Future date not allowed!");
        return "";
    }

        let age=today.getFullYear()-birthDate.getFullYear();
        const month=today.getMonth()-birthDate.getMonth();

        if(month<0 || (month==0 && today.getDate()<birthDate.getDate())){
            age--;
        }

        return age;
    };

    const handleChange=(e)=>{
        const {name,value,type,checked}=e.target;
        
        if(name=="dob"){
            const age=calculateAge(value);
            setFormData({...formData,dob:value,age:age});
        }else if(type==="checkbox"){
            let updatedSkills=[...formData.skills];
            if(checked){
                updatedSkills.push(value);
            }else{
                updatedSkills=updatedSkills.filter(skill=>skill!==value);
            }
            setFormData({...formData,skills:updatedSkills});
        }else{
            setFormData({...formData,[name]:value});
        }
    };

    const handleSubmit=(e)=>{
        e.preventDefault();

        alert(
            `First Name: ${formData.firstName}
             Last Name: ${formData.lastName}
             Gender: ${formData.gender}
             DOB: ${formData.dob}
            Age: ${formData.age}
            Skills: ${formData.skills.join(", ")}
            Address: ${formData.address}
            State: ${formData.state}`
        );
    };

    const handleClear=()=>{
        setFormData({
        firstName:"",
        lastName:"",
        gender:"",
        dob:"",
        age:"",
        skills:[],
        address:"",
        state:""
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>User Registration Form</h2>

            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
            <br /><br />

            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
            <br /><br />

            <label>Gender:</label>
            <input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender === "Male"}/>
            <label>Male</label>
            <input type="radio" name="gender" value="Female" onChange={handleChange} checked={formData.gender === "Female"} />
            <label>Female</label>
            <br /><br />

            <label>DOB:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} max={todayDate}/>
            <br /><br />

            <label>Age:</label>
            <input type="number" value={formData.age} readOnly />
            <br /><br />

            <label>Skills:</label>
            <br />
            <label>Java</label>
            <input type="checkbox" value="Java" onChange={handleChange}  checked={formData.skills.includes("Java")}/>
            <label>Python</label>
            <input type="checkbox" value="Python" onChange={handleChange}  checked={formData.skills.includes("Python")} />
            <label>Data Science</label>
            <input type="checkbox" value="Data Science" onChange={handleChange}  checked={formData.skills.includes("Data Science")}/>
            <br /><br />

            <label>Address:</label>
            <br />
            <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
            <br /><br />

            <label>State:</label>
            <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="Delhi">Delhi</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Telangana">Telangana</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
            <br /><br />

            <button type="submit">Submit</button>
            <button type="button" onClick={handleClear}>Clear</button>

        </form>
    );
}

export default UserForm;