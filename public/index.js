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
    $(".metrics").on("click", function () {
        $("#content").load("metrics.html");
    });

    var interval1 = setInterval(function () {
        getTotalUsersCount();
    }, 20 * 1000);
    getTotalUsersCount();
    var interval2 = setInterval(function () {
        getRedemptionsCount();
    }, 60 * 1000);
    getRedemptionsCount();
    var interval3 = setInterval(function () {
        getIncidents();
    }, 15 * 1000);
    getIncidents();
    getBannedCount();
});

let backendEndpoint = "https://api-treasurehunt-2020.socure.net";
// let backendEndpoint = "http://localhost:8080";

function searchSubmit() {
    var searchText = $("#search-input").val();
    if (searchText) {
        var url = backendEndpoint + '/user/search/' + searchText
        $.ajax({
            url: url,
            method: "GET",
            success: function (res) {
                if (res.length > 0) {
                    var source = $("#search-table-template").html();
                    res.users = res;
                    var template = Handlebars.compile(source);
                    var result = template(res)
                    $("#search-results-table-head").html(`<tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Login Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Institution</th>
                    <th>Level</th>
                    <th>Stats</th>
                    <th>Token</th>
                    <th>Banned?</th>
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
    var url = backendEndpoint + '/users/count';
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

function getRedemptionsCount() {
    var url = backendEndpoint + '/redemptions';
    $.ajax({
        url: url,
        method: "GET",
        success: function (res) {
            $("#redemptions-count").html(res).css("color", "green");
        },
        failure: function (res) {
            $("#redemptions-count").html(res).css("color", "red");
        },
        error: function (data) {
            var res = data.responseJSON.message;
            $("#redemptions-count").html(res).css("color", "red");
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


function getIncidents() {
    var url = backendEndpoint + '/incidents';
    $.ajax({
        url: url,
        method: "GET",
        success: function (res) {
            var lowColor = res.low == 0 ? "green" : "red";
            var highColor = res.high == 0 ? "green" : "red";
            $("#inc-low").html(res.low).css("color", lowColor);
            $("#inc-high").html(res.high).css("color", highColor);
        },
        error: function (data) {
            var res = data.responseJSON.message;
            console.log("Failed to fetch incidents...")
        }
    });
}

function getBannedCount() {
    var url = backendEndpoint + '/ban_count';
    $.ajax({
        url: url,
        method: "GET",
        success: function (res) {
            var banColor = res > 0 ? "red" : "green";
            $("#banned-count").html(res).css("color", banColor);
        },
        error: function (data) {
            var res = data.responseJSON.message;
            console.log("Failed to fetch ban count...")
        }
    });
}

function getMetrics() {
    var url = backendEndpoint + '/metrics';
    $.ajax({
        url: url,
        method: "GET",
        success: function (res) {
            console.log(res)
            debugger;

            if (res.length > 0) {
                var source = $("#metrics-table").html();
                res.metrics = res;
                var template = Handlebars.compile(source);
                var result = template(res)
                $("#metrics-results-table-head").html(`<tr>
                <th>Id</th>
                <th>Name</th>
                <th>Login Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Token</th>
                <th>Status</th>
                </tr>`);
                $("#metrics-error").html("");
                $("#metrics-results-table-body").html(result);
            } else {
                $("#metrics-results-table-head").html("")
                $("#metrics-results-table-body").html("");
                $("#metrics-error").html("<br><h5 class='text-center'>No Data Found</h5>");
            }


        },
        error: function (data) {
            var res = data.responseJSON.message;
            console.log("Failed to fetch metrics...")
        }
    });
}

function getMetricsBySeverity(severity) {
    var url = `${backendEndpoint}/metrics/${severity}`;
    $.ajax({
        url: url,
        method: "GET",
        success: function (res) {
            console.log(res)
            debugger;

            if (res.length > 0) {
                var source = $("#metrics-table").html();
                res.metrics = res;
                var template = Handlebars.compile(source);
                var result = template(res)
                $("#metrics-results-table-head").html(`<tr>
                <th>Id</th>
                <th>Name</th>
                <th>Login Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Token</th>
                <th>Status</th>
                </tr>`);
                $("#metrics-error").html("");
                $("#metrics-results-table-body").html(result);
            } else {
                $("#metrics-results-table-head").html("")
                $("#metrics-results-table-body").html("");
                $("#metrics-error").html("<br><h5 class='text-center'>No Data Found</h5>");
            }


        },
        error: function (data) {
            var res = data.responseJSON.message;
            console.log("Failed to fetch metrics...")
        }
    });
}


function toggleUserStatus(loginName) {
    var isBanned = $('#'+loginName).attr('checked')
    console.log(isBanned);
    var url;
    if(isBanned) {
        url = `${backendEndpoint}/user/unban?name=${loginName}`;
    } else {
        url = `${backendEndpoint}/user/ban?name=${loginName}`;
    }
    $.ajax({
        url: url,
        method: "PUT",
        success: function (res) {
            console.log(res);
            $('#'+loginName).attr('checked', !isBanned);
        },
        failure: function (res) {
            console.log(res);
        },
        error: function (res) {
            console.log(res);
        }
    });
}

function getAllUsers() {
    var url = backendEndpoint + '/users'
    $.ajax({
        url: url,
        method: "GET",
        success: function (res) {
            if (res.length > 0) {
                var source = $("#search-table-template").html();
                res.users = res;
                var template = Handlebars.compile(source);
                var result = template(res)
                $("#search-results-table-head").html(`<tr>
                <th>Id</th>
                <th>Name</th>
                <th>Login Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Institution</th>
                <th>Level</th>
                <th>Stats</th>
                <th>Token</th>
                <th>Banned?</th>
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
}

function getBannedUsers() {
    var searchText = $("#search-input").val();
    var url = backendEndpoint + '/banned_users?text=' + searchText
    $.ajax({
        url: url,
        method: "GET",
        success: function (res) {
            if (res.length > 0) {
                var source = $("#search-table-template").html();
                res.users = res;
                var template = Handlebars.compile(source);
                var result = template(res)
                $("#search-results-table-head").html(`<tr>
                <th>Id</th>
                <th>Name</th>
                <th>Login Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Institution</th>
                <th>Level</th>
                <th>Stats</th>
                <th>Token</th>
                <th>Banned?</th>
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
}

// Handlebar Helpers

Handlebars.registerHelper("checkedIf", function (condition) {
    return (condition) ? "checked" : "";
});