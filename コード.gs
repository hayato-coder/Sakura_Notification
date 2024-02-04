function myFunction() {
  newslist = scrayping_from_Sakura('https://www.sakura-2005.com/')
  console.log(newslist)
  notification(newslist[0])
}

function notification(message) {
  var token = PropertiesService.getScriptProperties().getProperty("LINE_TOKEN");
  const lineNotifyApi = 'https://notify-api.line.me/api/notify';

  const options =
   {
      "method"  : "post",
      "payload" : {"message": message},
      "headers" : {"Authorization":"Bearer " + token}
   };

   UrlFetchApp.fetch(lineNotifyApi, options);
}

function scrayping_from_Sakura(url) {
  var response = UrlFetchApp.fetch(url);
  var content = response.getContentText();
  var topic_block = Parser.data(content).from('<div class="index_news index_news_news">').to('</div>').build();
  var topics = Parser.data(topic_block).from('<li').to('</li>').iterate();
  var newslist = new Array()
  for (topic of topics) {
    news = Parser.data(topic).from('<a').to('</a>').build()
    newslist.push(news)
  }
  return newslist
}