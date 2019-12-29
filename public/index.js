$("document").ready(function () {
    $(".searchUsers").on("click", function () {
        $("#content").load("search.html");
    });
    $(".redeemUser").on("click", function () {
        $("#content").load("redeem.html");
    });
    $(".dashboard").on("click", function () {
        $("#content").load("dashboard.html");
    });
    $(".reset-password").on("click", function () {
        $("#content").load("reset.html");
    });

    var interval = setInterval(function () {
        getTotalUsersCount();
    }, 20 * 1000);
    getTotalUsersCount();
});

let backendEndpoint = "http://54.186.42.52";

function searchSubmit() {
    var searchText = $("#search-input").val();
    if (searchText) {
        var url = backendEndpoint + '/user/search/' + searchText
        $.ajax({
            url: url,
            method: "GET",
            success: function (res) {
                if (res.length > 0) {
                    var source = $("#table-template").html();
                    res.users = res;
                    var template = Handlebars.compile(source);
                    var result = template(res)
                    $("#search-results-table-head").html(`<tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Institution</th>
                    <th>Level</th>
                    <th>Stats</th>
                    <th>Token</th>
                </tr>`);
                    $("#search-error").html("");
                    $("#search-results-table-body").html(result);
                } else {
                    $("#search-results-table-head").html("")
                    $("#search-results-table-body").html("");
                    $("#search-error").html("<br><h5 class='text-center'>No Data Found</h5>");
                }

            }
        });
    } else {
        $("#search-results-table-head").html("")
        $("#search-results-table-body").html("");
        $("#search-error").html("<br><h5 class='text-center'>Enter a text to search</h5>");
    }
}

function redeemUser() {
    var searchText = $("#redeem-user").val();
    var url = backendEndpoint + '/user/redeem/' + searchText
    $.ajax({
        url: url,
        method: "POST",
        success: function (res) {
            $(".response-text").html(res.message).css("color", "green");
        },
        failure: function (res) {
            $(".response-text").html(res).css("color", "red");
        },
        error: function (data) {
            var res = data.responseJSON.message;
            $(".response-text").html(res).css("color", "red");
        }
    });
}


function checkStats() {
    var searchText = $("#stats-user").val();
    var url = backendEndpoint + '/user/stats/' + searchText
    $.ajax({
        url: url,
        method: "GET",
        success: function (res) {
            $(".response-text").html(res.message).css("color", "green");
        },
        failure: function (res) {
            $(".response-text").html(res).css("color", "red");
        },
        error: function (data) {
            var res = data.responseJSON.message;
            $(".response-text").html(res).css("color", "red");
        }
    });
}

function getTotalUsersCount() {
    var url = backendEndpoint + '/users/count/';
    $.ajax({
        url: url,
        method: "GET",
        success: function (res) {
            $("#users-count").html(res).css("color", "green");
        },
        failure: function (res) {
            $("#users-count").html(res).css("color", "red");
        },
        error: function (data) {
            var res = data.responseJSON.message;
            $("#users-count").html(res).css("color", "red");
        }
    });
}

function resetPassword() {
    $(".status-head").css("visibility", "hidden");
    var name = $("#reset-user").val();
    var url = backendEndpoint + '/user/reset_password?name=' + name;
    $.ajax({
        url: url,
        method: "PUT",
        success: function (res) {
            $(".status-head").css("visibility", "visible");
            $(".response-text").html(res.data).css("color", "green");
        },
        failure: function (res) {
            $(".response-text").html(res).css("color", "red");
        },
        error: function (data) {
            var res = data.responseJSON.message;
            $(".response-text").html(res).css("color", "red");
        }
    });
}

