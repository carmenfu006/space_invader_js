window.onload = function() {
  const jet = document.getElementById('jet');
  const board = document.getElementById('board');
}

window.addEventListener('keydown', function(e) {
  // Refer to css left 50% based on 600px width for the board
  let left = parseInt(window.getComputedStyle(jet).getPropertyValue('left'));
  // let bottom = parseInt(window.getComputedStyle(jet).getPropertyValue('bottom'));
  // Get the direction of the arrow and the space to move
  // Direction left and right
  if (e.key === 'ArrowLeft' && left > 0) {
    jet.style.left = left - 20;

  } else if (e.key === 'ArrowRight' && left <= 570) {
    jet.style.left = left + 20;
  }
  // Direction up and down, max 200
  // if (e.key === 'ArrowUp' && bottom < 200 ) {
  //   jet.style.bottom = bottom + 10;
  
  // } else if (e.key === 'ArrowDown' && bottom <= 200 && bottom > 0 ) {
  //   jet.style.bottom = bottom - 10;
  // }

  // Shoot with pressing space bar
  if (e.key === ' ') {
    // Create element and place bullets classname with it then append to board element to show the bullet
    let bullet = document.createElement('div');
    bullet.classList.add('bullets');
    board.appendChild(bullet);

    
    // Keep the things moving
    let movebullet = setInterval(function() {
      let aliens = document.getElementsByClassName('aliens');

      for (let i=0; i < aliens.length; i++) {
        let alien = aliens[i];

        if (alien != undefined) {
          let alienBound = alien.getBoundingClientRect();
          let bulletBound = bullet.getBoundingClientRect();
          
          if (
            bulletBound.left >= alienBound.left &&
            bulletBound.right <= alienBound.right &&
            bulletBound.top <= alienBound.top &&
            bulletBound.bottom <= alienBound.bottom
          ) {
            alien.parentElement.removeChild(alien); //Just removing that particular alien;
            //Scoreboard
            document.getElementById('scores').innerHTML =
              parseInt(document.getElementById('scores').innerHTML) + 1;
          }
        }
      }

      let bulletBottom = parseInt(window.getComputedStyle(bullet).getPropertyValue('bottom'));

      if (bulletBottom > 600) {
        clearInterval(movebullet);
      }

      // Get the bullet shoot from the jet position
      bullet.style.left = left + 5
      // Keep the bullet moving towards the alien
      bullet.style.bottom = bulletBottom + 3
    });
  }
})

let generateAliens = setInterval(function() {
  let alien = document.createElement('div');
  alien.classList.add('aliens');

  // let alienLeft = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));

  alien.style.left = Math.floor(Math.random() * 570);

  board.appendChild(alien);
  
}, 1000);


let moveAliens = setInterval(function() {

  let aliens = document.getElementsByClassName('aliens');
  for (let i=0; i < aliens.length; i++) {
    let alien = aliens[i];
    let alienTop = parseInt(window.getComputedStyle(alien).getPropertyValue('top'));

    if (alienTop >= 570) {
      alert('Your world has been invaded!');
      clearInterval(generateAliens);
      clearInterval(moveAliens);
      window.location.reload();
    }

    alien.style.top = alienTop + 25;
  }

}, 600);