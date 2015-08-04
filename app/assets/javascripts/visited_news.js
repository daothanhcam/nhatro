$(document).ready(function() {
  display_visited();

  var provinces = [];
  var adds_by_province;

  $(".visit").click(function() {
    save_link($(this));
  });

  function display_visited() {
    if (typeof localStorage["provinces"] === "undefined")
      document.getElementById("visited").style.display = "none";
    else
      document.getElementById("visited").style.display = "block";
  }

  function save_link(visit) {
    adds_by_province = visit.data("adds-by-province");

    if (typeof localStorage["provinces"] !== "undefined")
      provinces = JSON.parse(localStorage.provinces);
    else
      provinces = [];

    if (index() >= 0)
      provinces.splice(index(), 1);

    provinces.push(adds_by_province);
    localStorage["provinces"] = JSON.stringify(provinces);
  }

  function index() {
    for (var i = 0; i < provinces.length; i++) {
      if (adds_by_province.id === provinces[i].id)
        return i;
    }
    return -1;
  }

  function show_visited() {
    if (typeof localStorage["provinces"] !== "undefined")
      provinces = JSON.parse(localStorage.provinces);

    if(provinces.length > 5)
      var bottom = provinces.length - 5;
    else
      var bottom = 0;

    for (var i = (provinces.length - 1); i >= bottom; i--) {
      var html = $(".visited-address").clone();

      html.removeClass("visited-address");

      link = html.find("a.visit");
      link.attr("href", "http://" + location.host + "/addresses/" + provinces[i].id);
      link.html(provinces[i].title)

      $("#visited").append(html);
    }
  }

  show_visited();
});
