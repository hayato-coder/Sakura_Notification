function myFunction() {
  var url = 'https://www.sakura-2005.com/';
  var response = UrlFetchApp.fetch(url);
  var content = response.getContentText();
  var topic_block = Parser.data(content).from('<div class="index_news index_news_news">').to('</div>').build();
  var newslist = Parser.data(topic_block).from('<li').to('</li>').iterate();
  for (news of newslist) {
    console.log(Parser.data(news).from('<a').to('</a>').build())
  }
}