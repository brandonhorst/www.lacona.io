export function execute(result) {
  switch(result.action) {
    case 'learn':
        $('html, body').animate({scrollTop: 515}, 400);
      break;
    case 'subscribe':
      $.ajax({
        type: 'POST',
        url: `${window.__env.APIROOT}subscribe`,
        data: JSON.stringify({email: result.email}),
        contentType: 'application/json'
      }).then(() => {
        this.setState({
          noteMessage: `${result.email} was added to Newsletter. Check your email for confirmation.`,
          noteVisible: true,
          noteType: 'success'
        })
      }, error => {
        const email = encodeURIComponent(result.email)
        window.location.href = `http://lacona.us10.list-manage.com/subscribe?u=f923be23d36f00f457ea3b2c6&id=1db875d5ed&MERGE0=${email}`
      })
      break;
    case 'tweet':
      const message = encodeURIComponent(result.message)
      window.open(`https://twitter.com/intent/tweet?text=${message}&via=lacona`, '_blank', 'menubar=1,resizable=1,width=550,height=420')
    case 'share':
      switch(result.platform) {
        case 'facebook':
            window.open('https://www.facebook.com/sharer/sharer.php?u=https://lacona.io', '_blank', 'width=550,height=231')
          break;
        case 'twitter':
            window.open('https://twitter.com/intent/tweet?text=I%20tweeted%20this%20with%20Lacona&url=https%3A%2F%2Flacona.io', '_blank', 'menubar=1,resizable=1,width=550,height=420')
          break;
        case 'google-plus':
            window.open('https://plus.google.com/share?url=https://lacona.io', '_blank', 'menubar=1,resizable=1,width=534,height=446')
          break;
        case 'email':
            window.location.href = 'mailto:?&subject=Check out Lacona&body=The%20upcoming%20natural%20language%20command%20system%20for%20Mac.%0A%0Ahttps://lacona.io'
          break;
      }
      break;
    case 'follow':
      window.open('https://twitter.com/intent/follow?screen_name=lacona&user_id=1963107458', '_blank', 'menubar=1,resizable=1,width=534,height=446')
      break;
    case 'fork':
      window.open('https://github.com/lacona', '_blank')
      break;
    case 'contact':
      switch (result.platform) {
        case 'twitter':
            window.open('https://twitter.com/intent/tweet?text=Hey%20%40lacona%2C%20', '_blank', 'menubar=1,resizable=1,width=550,height=420')
          break;
        case 'email':
            window.location.href = 'mailto:app@lacona.io?Subject=Lacona%20Questions'
          break;
      }
      break;
    case 'change':
      this.setState({theme: result.theme})
      break;
  }
}


export function select(result) {
  if (result.action === 'change' && result.theme) {
    this.setState({theme: result.theme})
  }
}
