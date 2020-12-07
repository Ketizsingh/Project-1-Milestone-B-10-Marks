$('.popover-dismiss').popover({
    trigger: 'focus'
})


$("#updateProfileButton").click(function () {

    let token = localStorage.getItem('accessToken');
    let id = localStorage.getItem('id');
    var username = $("#profile-username").val();
    var name = $("#profile-name").val();
    var email = $("#profile-email").val();
    var address = $("#profile-address").val();

    $.ajax({
        type: 'PUT',
        url: '/api/v1/needy/' + id,
        data: {
            username: username,
            name: name,
            email: email,
            address: address
        },
        headers: {
            "Authorization": token
        },
        async: true,
        dataType: 'json'
    }).done((data) => {
        console.log(data);
        if (data.status) {
            $(".notificationer").html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
            
            <p>
                Your profile has been updated. Some of the end points are Vulnerabile, will be fixed in next update
            </p>

            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
        </div>`);

        }

    }).fail(function (data) {

        console.log(data);


    })




    $('#displayUpdateProfileButton').hide();
    $(".editButton").show();


})



$('.editButton').click(function () {
    $("#profile-name").focus();

    $(".editButton").hide();

    // $(".profile-table").append('<tr><td></td><td><button type="button" class="btn btn-sm btn-light float-right" id="updateProfileButton">Update</button></td></tr>');

    // $('#updateProfileButton').hide();
    $('#displayUpdateProfileButton').show();

})


$('.resetButton').click(function () {

    var accountType = $("#accounttype").val();
    var resetType = $("#resetType").val();
    var resetValue = $("#resetValue").val();
    var newpassword = $("#newpassword").val();

    $.ajax({
        type: 'POST',
        url: '/api/v1/forgot',
        data: {
            accountType: accountType,
            resetType: resetType,
            resetValue: resetValue,
            newpassword: newpassword
        },
        // headers: {
        //   "Authorization": token
        // },
        async: true,
        dataType: 'json'
    }).done((data) => {
        console.log(data);
        if (data.status) {
            $(".errMessage").html('<div id="login-message" class="alert alert-success" role="alert"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ' + data.message + '</div>');
            console.log(newpassword)
            if (resetType == 'password' && typeof newpassword == 'undefined') {
                $(".errMessage").append(`<div class="form-group input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i
    ></span>
    <input class="form-control newpassword" type="password" name="newpassword" id="newpassword" placeholder="new password" />
        </div>`);

            } else {

                $(".resetButton").hide();
            }

        } else {
            $(".errMessage").html('<div id="login-message" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> ' + data.message + '</div>');
        }
    }).fail(function (data) {

        $(".errMessage").html('Server Error, Please contact admin');


    })

})

$("#resetType").change(function () {
    $(".resetButton").show();

    var type = $("#resetType").val();

    if (type == 'password') {


        $(".resetButton").html(`Reset Password`);
        $(".resetValueDiv").html(`<p>
        <small>Please enter your <strong>Username</strong> to reset password.</small>
    </p>
    
    <div class="form-group input-group">
        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i
></span>
<input class="form-control resetValue" type="text" name="username" id="resetValue" placeholder="username" />
    </div>`);


    } else if (type == 'username') {

        $(".resetButton").html(`Reset Username`);
        $(".resetValueDiv").html(`<p>
        <small>Please enter your <strong>Email</strong> to reset password</small>
    </p>
    
    <div class="form-group input-group">
        <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i
></span>
<input class="form-control resetValue" type="text" name="email" id="resetValue" placeholder="email" />
    </div>`);
    } else {
        $(".resetValueDiv").html(``);
    }

})

$("#login").click(function () {
    var username = $("#username").val();
    var password = $("#password").val();
    var type = $("#type").val();
    var remember = ($('#remember').is(":checked")) ? true : false;



    $.ajax({
        type: 'POST',
        url: '/api/v1/login',
        data: {
            username: username,
            password: password,
            type: type,
            remember: remember
        },
        // headers: {
        //   "Authorization": token
        // },
        async: true,
        dataType: 'json'
    }).done((data) => {
        if (data.status) {
            $("#message").html('<div id="login-message" class="alert alert-success" role="alert">' + data.message + '</div>');
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('id', data.id);
            window.setTimeout(function () {
                location.href = "/dashboard.html";
            }, 600);

        }
    }).fail(function (data) {
        $("#message").html('<div id="login-message" class="alert alert-danger" role="alert">' + data.responseJSON.message + '</div>');

    })
});


$("#logout").click(function () {
    let token = localStorage.getItem('accessToken');
    $.ajax({
        type: 'POST',
        url: '/api/v1/logout',
        data: {},
        headers: {
            "Authorization": token
        },
        async: true,
        dataType: 'json'
    }).done((data) => {
        if (data.status) {
            localStorage.removeItem('accessToken');
            window.setTimeout(function () {
                location.href = "/";
            }, 0);

        }
    }).fail(function (data) {

        window.setTimeout(function () {
            location.href = "/dashboard.html";
        }, 0);

    })
});




$("#register").click(function () {
    var username = $("#username").val();
    var password = $("#password").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var confirmpassword = $("#confirmpassword").val();
    var address = $("#address").val();
    var type = $("#type").val();



    $.ajax({
        type: 'POST',
        url: '/api/v1/register',
        data: {
            username: username,
            name: name,
            password: password,
            confirmpassword: confirmpassword,
            email: email,
            address: address,
            type: type
        },
        // headers: {
        //   "Authorization": token
        // },
        async: true,
        dataType: 'json'
    }).done((data) => {
        if (data.status) {
            $("#message").html('<div id="login-message" class="alert alert-success" role="alert">' + data.message + '. Redirecting to login page...</div>');
            //   localStorage.setItem('accessToken',data.accessToken);
            window.setTimeout(function () {
                location.href = "/";
            }, 1000);

        }
    }).fail(function (data) {
        $("#message").html('<div id="login-message" class="alert alert-danger" role="alert">' + data.responseJSON.message + '</div>');

    })
});




function formatDate(dateUnformatted) {
    const date = new Date(dateUnformatted);
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return date.getDate() + " " + month[date.getMonth()] + ", " + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function checkonline() {
    let token = localStorage.getItem('accessToken');
    if (token == undefined) {
        window.setTimeout(function () {
            location.href = "/";
        }, 0);
    }

}

function dashboard() {
    let token = localStorage.getItem('accessToken');


    $.ajax({
        type: 'GET',
        url: '/api/v1/needy',
        data: {},
        headers: {
            "Authorization": token
        },
        async: true,
        dataType: 'json'
    }).done((data) => {


        $.each(data.needyPeoples, function (key, value) {
            key++;
            const {
                address,
                created_at,
                email,
                id,
                name,
                password,
                status,
                updated_at,
                username
            } = value;

            $(".allUsers").append('<li class="list-group-item"><span><img class="rounded-circle mr-3" width="30px" src="https://ui-avatars.com/api/?background=random&color=fff&name=' + name + '"></span> <span><small>' + name + '</small></span></li>');

            return key < 5;

        });



        const {
            address,
            created_at,
            email,
            id,
            name,
            password,
            status,
            updated_at,
            username
        } = data.userDetails;


        const lastLoginDateTime = (data.loginHistoryData.length > 1) ? data.loginHistoryData[1].timestamp : data.loginHistoryData[0].timestamp;
        const lastLoginFrmatted = '<small>Last login: </small>' + formatDate(lastLoginDateTime);

        let loginHistoryHTML = '<ul class="list-group list-group-flush">';
        $.each(data.loginHistoryData, function (key, value) {
            const {
                timestamp
            } = value;
            loginHistoryHTML += ' <li class="list-group-item">' + formatDate(timestamp) + '</li>';
            return key < 10;
        });
        loginHistoryHTML += '</ul>';

        $('.allLoginHistoryHtml').attr('data-content', loginHistoryHTML);

        $(".loginHistoryCount").html(data.loginHistoryData.length);
        $(".lastLogin").html(lastLoginFrmatted);

        $("#displayName").html(name);

        $("#profile-name").val(name);
        $("#profile-email").val(email);
        $("#profile-username").val(username);
        $("#profile-address").val(address);
        $("#profile-account").html('<small>' + formatDate(created_at) + '</small>');




        $(".displayText").html('<span class="badge">Email</span>' + email + '<br><span class="badge">Username</span>' + username + '<br><span class="badge">Account Id</span>' + id + '<br><span class="badge">Address</span>' + address + '<br><span class="badge">Since</span>' + created_at + '<br>');
        $(".displayPic").attr("src", "https://ui-avatars.com/api/?background=fff&color=28a745&name=" + name);
    }).fail(function (data) {
        localStorage.removeItem('accessToken');
        checkonline()

    })


}