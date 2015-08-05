function remove_fields(link) {
  var tabAddImage = $("#tab-add-image");
  var tabContent = $(".tab-content");

  li_current_active = tabAddImage.find("li.active");
  li_previous = li_current_active.prev();
  li_next = li_current_active.next();

  div_curr_active = tabContent.find("div.active");
  div_curr_active.find("[id$=_destroy]").attr("value", "1");

  div_pre = div_curr_active.prev();
  div_next = div_curr_active.next();

  if (li_next.find("a:visible").length !== 0 ) {
    li_next.attr("class", "active");
    div_next.attr("class", "tab-pane active");
    li_current_active.remove();
    div_curr_active.hide();
  }
  else {
    li_previous.attr("class", "active");
    div_pre.attr("class", "tab-pane active")
    li_current_active.remove();
    div_curr_active.hide();
  }

  if (tabContent.find("div.tab-pane:visible").length === 0) {
    $("#images-form").hide("slow");
    $(".btn-action-show-images").attr("class", "btn-action-show-images btn btn-info toggler disabled");
    $(".btn-action-show-images").find("i").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
  }
}

function add_fields(link, association, content) {
  var new_id = new Date().getTime();
  var regexp = new RegExp("new_" + association, "g");

  var tabAddImage = $("#tab-add-image");
  tabAddImage.find("li.active").attr("class", "");

  var new_tab = ("<li class=\"active\"><a data-toggle=\"tab\" href=" + "#" + new_id + ">New Image</a></li>");
  tabAddImage.append(new_tab);

  var tabContent = $(".tab-content");
  tabContent.find("div.active").attr("class", "tab-pane fade");

  var divTabPane = ("<div id=" + new_id + " class= \"tab-pane active\">" + content.replace(regexp, new_id) + " <input id=" + "address_images_attributes_" + new_id + "_destroy" + " name=" + "address[images_attributes][" + new_id + "][_destroy]" + " type=\"hidden\" value=\"false\"></div>");
  tabContent.append(divTabPane);

  $(".btn-action-show-images").attr("class", "btn-action-show-images btn btn-info toggler active");
  $(".btn-action-show-images").find("i").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");

  $("#images-form").show("slow");

  $("#" + new_id).change(function() {
    var filename = $(this).find("input[type=file]").val();
    var lastIndex = filename.lastIndexOf("\\");
    if (lastIndex >= 0) {
      filename = filename.substring(lastIndex + 1);
    }
    if (filename === "" || filename === null )
      $("a[href=#" + $(this).attr("id") + "]").html("New Image");
    else
      $("a[href=#" + $(this).attr("id") + "]").html(filename);
  });
}

$(".tooltip").tooltip();
