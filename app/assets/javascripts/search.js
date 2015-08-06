$(document).ready(function() {
  function format_square(id) {
    $("select#" + id).find("option").each(function(i) {
      var text = $(this).text();
      var new_option = "<option>" + text + " m&sup2" + "</option>";

      if(i !== 0)
        $(this).replaceWith(new_option);
    });
  }

  function min_change(min, max) {
    var text_select = parseInt($(min + " option:selected").text());
    $(max).find("option").each(function(i) {
      var text_collect = parseInt($(max).find("option").eq(i).text());

      if ($.isNumeric(text_select)){
        if(text_select > text_collect)
          $(max).find("option").eq(i).hide();
        else
          $(max).find("option").eq(i).show();
      }
    });
  }

  function max_change(min, max) {
    var text_select = parseInt($(max + " option:selected").text());

    if ($.isNumeric(text_select)){
      $(min).find("option").each(function(i) {
        var text_collect = parseInt($(min).find("option").eq(i).text());

        if(text_select > text_collect)
          $(min).find("option").eq(i).show();
        else
          $(min).find("option").eq(i).hide();
      });
    }
  }

  $("#address_search").submit(function(event) {
    var min_square = $("#min_square").val();
    var max_square = $("#max_square").val();
    var min_price = $("#min_price").val();
    var max_price = $("#max_price").val();
    var address = $("#address").val();
    var keyword = $("#keyword").val();
    var park = $("#parking_in").is(":checked");
    var air_con = $("#air_conditioner_in").is(":checked");
    var fan = $("#ceiling_fan_in").is(":checked");
    var wash = $("#washing_machine_in").is(":checked");
    var tv = $("#television_in").is(":checked");
    var network = $("#network_in").is(":checked");
    var table = $("#table_in").is(":checked");
    var chair = $("#chair_in").is(":checked");
    var bed = $("#bed_in").is(":checked");

    if (min_square === "" && max_square === "" &&
      min_price === "" && max_price === "" && address === "" && keyword === "" &&
      !park && !air_con && !fan && !wash && !tv && !network &&
      !table && !chair && !bed)
        event.preventDefault();
  });

  $("select").change(function() {
    var id = $(this).attr("id");

    switch(id){
      case "min_square":
        min_change("#min_square", "#max_square");
        break;
      case "max_square":
        max_change("#min_square", "#max_square");
        break;
      case "min_price":
        min_change("#min_price", "#max_price");
        break;
      case "max_price":
        max_change("#min_price", "#max_price");
        break;
      default:
        console.log("Sorry, we are out of " + id + ".");
    }
  });

  $("select").each(function() {
    var name = $(this).attr("id");
    if(name === "min_square" || name === "max_square")
      format_square(name);
  });

  $("#advance_search").click(function() {
    $("#content_advance_search").slideToggle();
  });

  function getUrlVars() {
    var vars = [], hash;
    var sPageUrl = window.location.search.substring("20");
    var hashes = sPageUrl.split("%5B");
    for(var i = 0; i < hashes.length; i++)
      {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
    return vars;
  }

  var url = window.location.search;
  
  $("form input:checkbox").each(function(){
    var id = $(this).attr("id");
    
    switch(id){
      case "parking_in":
        setCheckedBox("parking_in");
       break;
      case "air_conditioner_in":
        setCheckedBox("air_conditioner_in");
        break;
      case "ceiling_fan_in":
        setCheckedBox("ceiling_fan_in");
        break;
      case "washing_machine_in":
        setCheckedBox("washing_machine_in");
        break;
      case "television_in":
        setCheckedBox("television_in");
        break;
      case "network_in":
        setCheckedBox("network_in");
        break;
      case "table_in":
        setCheckedBox("table_in");
        break;
      case "chair_in":
        setCheckedBox("chair_in");
        break;
      case "bed_in":
        setCheckedBox("bed_in");
        break;
      default:
        console.log("Sorry, we are out of " + id + ".");  
    }
  });

  function setCheckedBox(id) {
    if (url.indexOf(id) !== -1){
      var status = getUrlVars()[id + "%5D"].split("&q");
      $("#" + id).prop("checked", status);
    }
  } 

  $("select").each(function() {
    var id = $(this).attr("id");

    switch(id){
      case "min_square":
        setSelectedIndexed(id, "square_gteq");
        min_change("#min_square", "#max_square");
        break;
      case "max_square":
        setSelectedIndexed(id, "square_lteq");
        max_change("#min_square", "#max_square");
        break;
      case "min_price":
        setSelectedIndexed(id, "price_gteq");
        min_change("#min_price", "#max_price");
        break;
      case "max_price":
        setSelectedIndexed(id, "price_lteq");
        max_change("#min_price", "#max_price");
        break;
      default:
        console.log("Sorry, we are out of " + id + ".");
    }
  });

  function setSelectedIndexed(id, selected_index) {
    if (url.indexOf(selected_index) !== -1){
      $("#" + id).find("option").each(function(i){
        var select_value = parseInt(getUrlVars()[selected_index + "%5D"].split("&q"));
        var opt_value = parseInt($("#" + id).find("option").eq(i).val());
    
        if (opt_value === select_value)
          document.getElementById(id).selectedIndex = i;
      });
    }
  }
});
