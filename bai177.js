
var coursesAPI ="http://localhost:3000/courses"
function start(){
   getCourses(renderCourses)
   handleCreateForm()
}


start()

// hàm lấy ra khóa học 
function getCourses(callback){
    fetch(coursesAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
// hàm redercourses 
function renderCourses (courses){
    var listCoursesBlock = document.getElementById("list-courses")
    var html = courses.map(function(course){
        return `
        <li> 
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="handledeleteCourses(${course.id})" id ='xoa'>Xóa</button>
        </li>
        `
    }).join("")
    listCoursesBlock.innerHTML=html;
}

function createCourses(data, callback){
    fetch(coursesAPI,{
        method:'POST',
        body:JSON.stringify(data),// chuyển qua json 
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    })
    .then(function(response){
        return response.json();
    })
    .then(callback)
}

// function delete code
function handledeleteCourses(id){
    var options={
        method:'DELETE',
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers:{
            'Content-Type': 'application/json'
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
    fetch(coursesAPI+'/'+id, options)// xóa 
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(courses){
            console.log(courses)
            getCourses(renderCourses)
        })
        .catch(function(err){
            console.log(err)
        })
        
}
// xử lí form 
function handleCreateForm(){
    var createBtn= document.getElementById('create')
    createBtn.onclick= function(){
        var name = document.querySelector('input[name=name]').value
        var description = document.querySelector('input[name=description]').value
        var formData={
            name : name,
            description:description
        }
        // gửi đi 1 cái yêu cầu dưới dạng fetch 
        createCourses(formData,function(){
            getCourses(renderCourses)
        })
        
    }
}

// hành vi xoa 
var DeleteBtn = document.getElementById("xoa")
console.log(DeleteBtn)