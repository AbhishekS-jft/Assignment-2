details=[]; // employee details array
getData();  // fetching previous details
table();    // creating table
var INDEX;  // Global variable for index updating
function getData()  // Get previous data if present
{
    let Data=localStorage.getItem("details");
    if(Data)
    {
        details=JSON.parse(Data);
    }
    else
    {
        setData();
    }
}
function setData()  //  setting data in local storage
{
    localStorage.setItem("details",JSON.stringify(details));
}

function table()    // Making Dynamic Table
{
    var html = "<table  border='1|1' ><tr> <th>S No.</th> <th>Name</th><th>Job</th><th>Salary</th> <th>Edit</th> <th>Delete</th></tr>";

    for(let i=1;i<=details.length;i++)
    {
        html+="<tr>";
        html+="<td>"+i+"</td>";
        html+="<td>"+details[i-1].name+"</td>";     //i-1 -> for 0 based indexing , S.no now starts with 1
        html+="<td>"+details[i-1].job+"</td>";
        html+="<td>"+details[i-1].sal+"</td>";
        html+="<td><button id="+(i-1)+" onclick='edit(this.id)'>Edit</button>"+"</td>";
        html+="<td><button id="+(i-1)+" onclick='Delete(this.id)'>Delete</button>"+"</td>"; 
        html+="</tr>";
    }
        html+="</table>";
        document.getElementById("box").innerHTML=html;
    
    };

function add()  //taking user-input data
{
    let Name=document.getElementById("name").value;
    let Sal=document.getElementById("sal").value;
    let Job=document.getElementById("job").value;
    if(Name==0 || Sal==0 || Job==0)
    {
        alert("Fields are Empty");
        return;
    }
    let obj={
        name:Name,
        sal:Sal,
        job:Job
    };
    details.push(obj);
    setData();
    table();
    clean();
}

function clean()
{
    document.getElementById("name").value="";
    document.getElementById("job").value="";
    document.getElementById("sal").value="";
}

function edit(index)
{
    document.getElementById("name").value=details[index].name;
    document.getElementById("job").value=details[index].sal;
    document.getElementById("sal").value=details[index].job;
    document.getElementById("add").disabled=true;
    document.getElementById("update").disabled=false;  
    INDEX=index;
}

function update()
{
    let new_name=document.getElementById("name").value;
    let new_sal=document.getElementById("sal").value;
    let new_job=document.getElementById("job").value;
    if(new_name==0 || new_sal==0 || new_job==0)
    {
        alert("Fields are Empty");
        return;
    }

    details[INDEX]={
        name:new_name,
        job:new_job,
        sal:new_sal
    };
    setData();
    table();
    document.getElementById("add").disabled=false;
    document.getElementById("update").disabled=true; 
    clean();

}

function Delete(index)
{
    console.log(index);
    details.splice(index,1);
    
    setData();
    table();
}