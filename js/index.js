async function showAlert(msg) {

    $('#errorModal #errorModalLabel').html(msg)
    await $('#errorModal').css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
        background: 'rgba(0,0,0,.7)'
    }).promise()
    setTimeout(() => {
        $('#errorModal .trigger').addClass('drawn')
        $('#errorModal').addClass('show')
        $('body').append('<div class="modal-backdrop fade"></div>').css('overflow-y', 'hidden').promise()
    }, 150)
}

$("#btn-login").click(function () {
    let userID = $("#login-id").val();
    let password = $("#login-password").val();

    if (userID === "user" && password === "user") {
        $("#login-fail-alert").hide();
        localStorage.setItem("userType", 1);
        location = "./index.html";
    } else if (userID === "agent" && password === "agent") {
        $("#login-fail-alert").hide();
        localStorage.setItem("userType", 2);
        location = "./index.html";
    } else if (userID === "manager" && password === "manager") {
        $("#login-fail-alert").hide();
        localStorage.setItem("userType", 3);
        location = "./index.html";
    } else {
        localStorage.setItem("userType", 0);
        $("#login-fail-alert").show();
        toastr.error('Hi! I am error message.');
    }

});

$(document).ready(function () {
    $("#login-fail-alert").hide();
    showLoginItem();
    $('[data-toggle="tooltip"]').tooltip();
    $(".loading-animate").hide();
});

function showLoginItem() {
    $(".add-news").hide();
    $(".edit-news").hide();
    if (localStorage.getItem("userType") == 1) {
        $('.navbar-nav.ml-auto').append('<li class="nav-item hvr-float appointment-nav"><a class="nav-link" href="./appointment_for_user.html">Appointment</a></li><li class="nav-item user-profile-nav hvr-float"><a class="nav-link" href="./user_profile.html"><img src="img/new1.jpg" id="user-icon" />Profile</a></li><li class="nav-item hvr-float"><a class="nav-link" href="#" id="btn-sign-out">Sign-out</a></li>');
        $("#agent-property").hide();
    } else if (localStorage.getItem("userType") == 2) {
        // $('.navbar-nav.ml-auto').append('<li class="nav-item hvr-float appointment-nav"><a class="nav-link" href="./appointment_for_agent.html">Appointment</a></li><li class="nav-item profile-nav hvr-float"><a class="nav-link" href="./profile.html"><img src="img/new1.jpg" id="user-icon" />Profile</a></li><li class="nav-item hvr-float"><a class="nav-link" href="#" id="btn-sign-out">Sign-out</a></li>');
        $('.navbar-nav.ml-auto').append(''
            + '<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Management </a> <div class="dropdown-menu" aria-labelledby="navbarDropdown"> <a class="dropdown-item" href="./appointment_for_agent.html">Appointment</a> <a class="dropdown-item" href="./management_news_agent.html">News & Blog</a> </div> </li>'

            + '<li class="nav-item profile-nav hvr-float"><a class="nav-link" href="./profile.html"><img src="img/new1.jpg" id="user-icon" />Profile</a></li>'
            + '<li class="nav-item"><a class="nav-link" href="#" id="btn-sign-out">Sign-out</a></li>');
        $(".add-news").show();
        $(".edit-news").show();
    } else if (localStorage.getItem("userType") == 3) {
        // $('.navbar-nav.ml-auto').append('<li class="nav-item hvr-float appointment-nav"><a class="nav-link" href="appointment_for_cm.html">Appointment</a></li><li class="nav-item manager-account-nav hvr-float"><a class="nav-link" href="./manage_account.html">Manage Account</a></li><li class="nav-item profile-nav hvr-float"><a class="nav-link" href="./profile.html"><img src="img/new1.jpg" id="user-icon" />Profile</a></li><li class="nav-item"><a class="nav-link" href="#" id="btn-sign-out">Sign-out</a></li>');
        $('.navbar-nav.ml-auto').append(''
            + '<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Management </a> <div class="dropdown-menu" aria-labelledby="navbarDropdown"> <a class="dropdown-item" href="./manage_account.html">Account</a> <a class="dropdown-item" href="./appointment_for_cm.html">Appointment</a> <a class="dropdown-item" href="./property_list_cm.html">Property</a> <a class="dropdown-item" href="./management_news_cm.html">News & Blog</a> </div> </li>'
            + '<li class="nav-item profile-nav hvr-float"><a class="nav-link" href="./profile.html"><img src="img/new1.jpg" id="user-icon" />Profile</a></li>'
            + '<li class="nav-item"><a class="nav-link" href="#" id="btn-sign-out">Sign-out</a></li>');
        $(".add-news").show();
        $(".edit-news").show();
    } else {
        $(".navbar-nav.ml-auto").append('<li class="nav-item sign-up-nav hvr-float"><a class="nav-link" href="./register.html">Sign-Up</a></li><li class="nav-item sign-in-nav hvr-float"><a class="nav-link" href="./login.html" id="btn-nav-login">Sign-In</a></li>');
    }


}

$('body').on('click', '#btn-sign-out', function () {
    localStorage.setItem("userType", 0);
    location = "./index.html";
});

$(".btn-user-disable").click(function () {
    if ($(this).hasClass("btn-user-enable")) {
        $(this).removeClass("btn-user-enable");
        $(this).removeClass("btn-primary");
        $(this).html("Disable");
        $(this).addClass("btn-danger");
        $(this).addClass("btn-user-disable");
        $(this).closest(".card").addClass("card-enabled");
        $(this).closest(".card").removeClass("card-disabled");
    } else {
        $(this).removeClass("btn-user-disable");
        $(this).removeClass("btn-danger");
        $(this).html("Enable");
        $(this).addClass("btn-primary");
        $(this).addClass("btn-user-enable");
        $(this).closest(".card").addClass("card-disabled")
        $(this).closest(".card").removeClass("card-enabled");
    }
});
function hideAllUser() {
    $(".user-type-user").hide();
    $(".user-type-agent").hide();
}

$(".btn-search-m").click(function () {
    hideAllUser();
    $(".loading-animate").show();
    setTimeout(function () {
        $(".loading-animate").hide();
        $(".user-type-user").show();
        $(".user-type-agent").show();
    }, 2000);
});

$("#search-all-user").click(function () {
    hideAllUser();
    $(".loading-animate").show();
    setTimeout(function () {
        $(".loading-animate").hide();
        $(".user-type-user").show();
        $(".user-type-agent").show();
    }, 2000);
});


$("#search-normal-user").click(function () {
    hideAllUser();
    $(".loading-animate").show();
    setTimeout(function () {
        $(".loading-animate").hide();
        $(".user-type-user").show();
        $(".user-type-agent").hide();
    }, 2000);
});

$("#search-agent").click(function () {
    hideAllUser();
    $(".loading-animate").show();
    setTimeout(function () {
        $(".loading-animate").hide();
        $(".user-type-user").hide();
        $(".user-type-agent").show();
    }, 2000);
});


$("#create-account").click(function () {
    $("#user-search-result").prepend(`
    <div class="col mb-4 user-enabled user-type-user">
                <div class="card ">
                  <img src="img/user_icon.png" class="card-img-top user-search-result-icon" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${$("#register-name").val()}</h5>
                    <p class="card-text">
                    <p>User type: ${$("#userTypeSelect").val()}</p>
                    <p>Email: ${$("#register-email").val()}</p>
                    <p>Tel: ${$("#register-tel").val()}</p>
                    <p>Mobile: ${$("#register-mobile").val()}</p>
                    <p><button class="btn btn-danger float-right btn-user-disable">Disable</button></p>
                    </p>
                  </div>
                </div>
              </div>
  `);
});

$("#agent-select-all-property").click(function () {
    $(".agent-property-for-sale").show();
    $(".agent-property-for-rent").show();
});

$("#agent-select-sale-property").click(function () {
    $(".agent-property-for-sale").show();
    $(".agent-property-for-rent").hide();
});

$("#agent-select-rent-property").click(function () {
    $(".agent-property-for-sale").hide();
    $(".agent-property-for-rent").show();
});

$(".agent-property-remove").click(function () {
    let $agentProperty = $(this).closest(".col");
    $("#propertyRemoveModal").modal("show");
    $("#btn-remove-property").click(function () {
        $agentProperty.hide();
    });
});

$("#search-box-rent").click(function () {
    $("#search-box-buy").removeClass("active");
    $(this).addClass("active");
    $("#search-box-text-field").attr("href", "rent_property.html");
    $(".btn-view-more").attr("href", "rent_property.html");
});

$("#search-box-buy").click(function () {
    $("#search-box-rent").removeClass("active");
    $(this).addClass("active");
    $("#search-box-text-field").attr("href", "buy_property.html");
    $(".btn-view-more").attr("href", "buy_property.html");
});

$(document).ready(function () {
    $(document).on('change', '.btn-file :file', function () {
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function (event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }

    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
    });

    $("#detailModal").on('shown.bs.modal', (function () {
        var dataIsAdded = false;
        return function () {
            if (!dataIsAdded) {
                $("modal-body").html("");
                dataIsAdded = true;
            }
        }
    })());
});

$(".property-img").click(function () {
    let $var = $(this).attr("src");
    $("#main-property-img").attr("src", $var);
});

$(document).ready(function () {
    $(".news-result-content").hide();
    $(".btn-search-news").click(function () {
        $(".search-news-content").hide();
        $(".loading-animate").show();
        $(".loading-animate").addClass("mar-bottom");
        setTimeout(function () {
            $(".loading-animate").hide();
            $(".loading-animate").removeClass("mar-bottom");
            $(".news-result-content").show();
        }, 2000);
    });
    $("#myCarousel").on("slide.bs.carousel", function (e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".carousel-item").length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $(".carousel-item")
                        .eq(i)
                        .appendTo(".carousel-inner");
                } else {
                    $(".carousel-item")
                        .eq(0)
                        .appendTo($(this).find(".carousel-inner"));
                }
            }
        }
    });
    $(".btn-search-property").click(function () {
        $(".property-result").hide();
        $(".loading-animate").show();
        setTimeout(function () {
            $(".loading-animate").hide();
            $(".property-result").show();
            $(".hide-buy-property").hide();
        }, 2000);
    });
    $(".show-btn-search-property").click(function () {
        $(".property-result").hide();
        $(".loading-animate").show();
        setTimeout(function () {
            $(".loading-animate").hide();
            $(".property-result").show();
            $(".hide-buy-property").show();
        }, 2000);
    });
    function hideAll() {
        $(".appointment-status-accepted").hide();
        $(".appointment-status-waiting").hide();
        $(".appointment-status-rejected").hide();
    }

    $("#search-all-appointment-status").click(function () {
        hideAll();
        $(".loading-animate").show();
        setTimeout(function () {
            $(".loading-animate").hide();
            $(".appointment-status-accepted").show();
            $(".appointment-status-waiting").show();
            $(".appointment-status-rejected").show();
        }, 2000);
    });

    $("#search-waiting-appointment-status").click(function () {
        hideAll();
        $(".loading-animate").show();
        setTimeout(function () {
            $(".loading-animate").hide();
            $(".appointment-status-accepted").hide();
            $(".appointment-status-waiting").show();
            $(".appointment-status-rejected").hide();
        }, 2000);
    });

    $(".btn-search-p").click(function () {
        hideAll();
        $(".loading-animate").show();
        setTimeout(function () {
            $(".loading-animate").hide();
            $(".appointment-status-accepted").show();
            $(".appointment-status-waiting").hide();
            $(".appointment-status-rejected").hide();
        }, 2000);
    });


    $("#search-accepted-appointment-status").click(function () {
        hideAll();
        $(".loading-animate").show();
        setTimeout(function () {
            $(".loading-animate").hide();
            $(".appointment-status-accepted").show();
            $(".appointment-status-waiting").hide();
            $(".appointment-status-rejected").hide();
        }, 2000);
    });

    $("#search-rejected-appointment-status").click(function () {
        hideAll();
        $(".loading-animate").show();
        setTimeout(function () {
            $(".loading-animate").hide();
            $(".appointment-status-accepted").hide();
            $(".appointment-status-waiting").hide();
            $(".appointment-status-rejected").show();
        }, 2000);
    });
    $(".btn-delete-property-cm").click(function () {
        let $agentProperty = $(this).closest("tr");
        $("#propertyRemoveModal").modal("show");
        $("#btn-remove-property").click(function () {
            $agentProperty.hide();
        });
    });
    $(".btn-accept").click(function () {
        $(this).parent("td").prev().html("<span class=\"status text-success accepted-bull\">&bull;</span> Accepted");
        $(this).parent("td").html('  <a href="#rate-form" class="settings" title="Edit" data-toggle="modal"><i class="fas fa-comments"></i></a><a href="#detailModal" class="settings" data-toggle="modal" style="width:10px"><i class="fas fa-search"></i></a>');
    });
    $(".btn-reject").click(function () {
        $(this).parent("td").prev().html("<span class=\"status text-success rejected-bull\">&bull;</span> Rejected");
        $(this).parent("td").html('  <a href="#rate-form" class="settings" title="Edit" data-toggle="modal"><i class="fas fa-comments"></i></a><a href="#detailModal" class="settings" data-toggle="modal" style="width:10px"><i class="fas fa-search"></i></a>');
    });
});

$("table.table td a.delete.unlocked").click(function () {
    if ($(this).hasClass("locked")) {
        $(this).addClass("unlocked");
        $(this).removeClass("locked");
        $(this).children("i").addClass("fa-unlock");
        $(this).children("i").removeClass("fa-lock");
        $(this).parent("td").prev().html("<span class=\"status text-success\">&bull;</span> Active");
    } else {
        $(this).addClass("locked");
        $(this).removeClass("unlocked");
        $(this).children("i").addClass("fa-lock");
        $(this).children("i").removeClass("fa-unlock");
        $(this).closest("td.status");
        $(this).parent("td").prev().html("<span class=\"status text-danger\">&bull;</span> Locked");
    }
});

$('#identicalForm').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        password: {
            validators: {
                identical: {
                    field: 'confirmPassword',
                    message: 'The password and its confirm are not the same'
                }
            }
        },
        confirmPassword: {
            validators: {
                identical: {
                    field: 'password',
                    message: 'The password and its confirm are not the same'
                }
            }
        }
    }
});



function removeAllActive() {
    $("nav div ul.navbar-nav li.nav-item").removeClass("active");
}

