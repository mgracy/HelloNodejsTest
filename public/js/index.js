$(function() {

    $loginBox = $("#loginBox");
    $registerBox = $("#registerBox");
    $userInfo = $("#userInfo");

    $loginBox.find('a').on('click', function() {
        $registerBox.show();
        $loginBox.hide();
    });

    $registerBox.find('a').on('click', function() {
        $loginBox.show();
        $registerBox.hide();
    });

    $registerBox.find('button').on('click', function() {
        $.ajax({
            url: '/api/user/register',
            type: 'post',
            data: {
                username: $registerBox.find('input[name="username"]').val(),
                password: $registerBox.find('input[name="password"]').val(),
                repassword: $registerBox.find('input[name="repassword"]').val()
            },
            dataType: 'json',
            success: function(result) {
                $registerBox.find('.message').html(result.message);

                if (!result.code) {
                    setTimeout(function() {
                        $loginBox.show();
                        $registerBox.hide();
                    }, 1000);
                }
            }
        });
    });

    $loginBox.find('button').on('click', function() {
        $.ajax({
            url: '/api/user/login',
            type: 'post',
            data: {
                username: $loginBox.find('input[name="username"]').val(),
                password: $loginBox.find('input[name="password"]').val()
            },
            dataType: 'json',
            success: function(result) {
                console.log(result.message);
                $loginBox.find('.message').html(result.message);

                if (!result.code) {
                    setTimeout(function() {
                        $loginBox.hide();
                        $userInfo.show();
                    }, 1000);

                    $userInfo.find('.username').html(result.userInfo.username);
                    $userInfo.find('.info').html("欢迎光临我的博客");
                }
            }
        });
    });

});