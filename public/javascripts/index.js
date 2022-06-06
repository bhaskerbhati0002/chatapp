var socket = io();
var messagebox = document.getElementById('messagebox');
var userslist = document.getElementById('userslist')

$('#send').on("click", function () {
    var message = document.getElementById("inputtext").value
    var to = document.getElementById('userslist').value
    var from = document.getElementById('selfid').value

    from = from.slice(10)

    if (to == 'public') {
        socket.emit('chat message', message, from)
        document.getElementById("inputtext").value = ''
    }
    else {
        socket.emit('private', message, from, to)
        document.getElementById("inputtext").value = ''
    }
})

socket.on('chat message', function (msg) {
    var item = document.createElement('div');
    item.textContent = msg;
    item.setAttribute("class", "message left")
    messagebox.appendChild(item);
});

socket.on('self message', function (msg) {
    var item = document.createElement('div');
    item.textContent = msg;
    item.setAttribute("class", "message right")
    messagebox.appendChild(item);
});

socket.on('user left', (users) => {
    var data = `<option value="public">Public</option>`
    for (var i of users) {
        data = data + `<option value="${i}">${i}</option>`
    }
    userslist.innerHTML = data
})

socket.on('otherlist', function (id) {
    var item = document.createElement('option')
    item.textContent = id
    item.setAttribute("value", id)
    userslist.appendChild(item)
})

socket.on('selflist', function (users, id) {
    var data = `<option value="public">Public</option>`
    for (var i of users) {
        
        data = data + `<option value="${i}">${i}</option>`
        if (i == id) {
            document.getElementById('selfid').value = "Your ID : " + id
        }
    }
    userslist.innerHTML = data
})