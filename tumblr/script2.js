const API_KEY = 'MaSrGWYGq1NLRosX5qoE9fAEYDXiyGJtrpiT9U66pfA9yNZfdn';
let button_div = document.getElementById('buttons')
let gallery_div = document.getElementById('gallery')
let score_span = document.getElementById('score')

let score = 0
let words = ['fish','house', 'dog', 'boat', 'beach', 'cat']
correct_answer = ''


words.forEach(function(word) {
  let new_button = document.createElement('button')
  new_button.innerHTML = word
  new_button.classList.add('btn')
  new_button.classList.add('btn-primary')
  new_button.onclick = function() {
      if (word == correct_answer) {
          score ++
          score_span.innerHTML = score
          generate() // add this
      } else {
          score ++
          score_span.innerHTML = score
          alert('WRONG!')
      }

  }
  button_div.append(new_button)

});



function generate() {
    gallery_div.innerHTML = null
    let random_number = Math.floor(Math.random() * words.length)
    correct_answer = words[random_number]

    fetch(`https://api.tumblr.com/v2/tagged?api_key=${API_KEY}&tag=${correct_answer}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(result) {
        console.log(result.response)
        result.response.forEach(function(post){
           if (post.type == 'photo') {
               console.log(post.photos[0].original_size.url)
               const pic = document.createElement('img')
               pic.src = post.photos[0].original_size.url
               pic.height = 200
               gallery_div.appendChild(pic)

           }
        })
    })
    
    
}

generate()
