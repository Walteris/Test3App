   //Credit: http://diveintohtml5.org/storage.html
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function supports_json() {
    try {
        return 'JSON' in window && window['JSON'] !== null;
    } catch (e) {
        return false;
    }
}

var $materialsXML;

$(document).ready(function () {

    //only bother if we support storage
    if (supports_html5_storage() && supports_json()) {

        $.ajax({
            type: "POST",
            //url: "http://www.estimate.sk/mobile/materials.aspx",
            url: "materials.aspx",
            Headers: { "Content-Type": "text/xml", "Proxy-connection": "Keep-Alive", "Access-Control-Allow-Origin": "*" },
            dataType: "text",                  
            //crossDomain: true,
            //cache: false,
            //contentType: false,
            success: xmlParser,
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });

        $("#mat_avail").live('pagecreate', function () {
            $("#form1").submit(function (event) {
                event.stopPropagation();
                event.preventDefault();

                $.mobile.changePage("#results");

                return false;
            });
        });
    }
});

//Handle the response of this async request
function xmlParser(data) {

    $('#load').fadeOut();

    materialsXML = data;
    $(materialsXML).find("R").each(function () {

        //var id = $(this).children()[0].textContent;
        var code = $(this).children()[1].textContent;
        var name = $(this).children()[2].textContent;
        var desc = $(this).children()[3].textContent;
        //data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="d" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d"

        $("#mat_list").append('<li data-name="' + code + '"><a href="#mat_avail"><h4 class="ui-li-heading">' + name + '</h4><p class="ui-li-desc">' + code + ', ' + desc + '</p></a></li>');

        //$("#mat_list").append('<li data-name="' + code + '"><h4 class="ui-li-heading">' + name + '</h4><p class="ui-li-desc">' + code + ', ' + desc + '</p></li>');

    });

    //$('#mat_list').listview('refresh'); 
}


$("#sel_mat").live('pageinit', function () {
    $("#mat_list").listview("refresh");
});

$('ul[id="mat_list"] a').live("vclick", function (evt) {
    //var selected_index = $(this).index();
    var selected_index = $(this).parents('li').eq(0).index();
    var code = $(this).parents('li').eq(0).attr('data-name');
    var desc = $(this).children('h4').eq(0).text();
    $("#material").val(code);
    $("#btn_selectmat .ui-btn-text").text(desc);
}); 
