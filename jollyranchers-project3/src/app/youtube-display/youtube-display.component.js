function update() {
  var select = document.getElementById('videos');
  var option = select.options[select.selectedIndex].value;
  var source;

  document.getElementById('displayTest').title = "Working";

  if(option == "fox13")
  {

    source = "https://www.youtube.com/watch?v=TMVteA-FzFA";
  }
  else if(option == "10Tampa")
  {
    source = "https://www.youtube.com/embed/tgbNymZ7vqY"
  }
  else if(option == "abc")
  {
    source = "https://www.youtube.com/watch?v=SCnK--ebTxE&list=OLAK5uy_kQm6ddTOsg6k62g5E6IFKECRWPAZD0e-4&index=2";
  }
  else if(option == "general")
  {
    source = "https://www.youtube.com/watch?v=NBqx2cHmuGk&list=OLAK5uy_m9EiltakhrlR8igBu-t-eHclppe2zpOfU&index=6";
  }
  document.getElementById('vidPlayer').src = source;
}

update();
