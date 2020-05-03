$(function() {
  var limit = 300;
  var login = 'lulzx';

  $.getJSON('https://api.github.com/users/' + login + '/repos?sort=pushed&callback=?', function(data) {
    var repos = data.data

    repos.sort(function(a, b) {
      return ( (+new Date(a.updated_at)) < (+new Date(b.updated_at)) ? 1 : -1 );
    });

    var len = repos.length;
    if(len > limit) len = limit;

    $('#repos').text('');
    $.each(repos.slice(0, len), function(ind, val) {
      if(val.name == 'lulzx.github.io') return;
      if(val.fork) return;
      if(ind+1 == len)
        $('#repos').append('<li><a href="' + val.html_url + '">&quot;' + val.name + '&quot;</a></li>');
      else
        $('#repos').append('<li><a href="' + val.html_url + '">&quot;' + val.name + '&quot;</a>,</li>');
    });
  });
});
