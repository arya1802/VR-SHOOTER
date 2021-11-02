AFRAME.registerComponent("enemy-bullets",{
    init:function () {
        setInterval(this.shootEnemyBullets,3000)
    },
    shootEnemyBullets:function() {
        var els=document.querySelectorAll(".enemy")
        for (var i=0; i<els.length;i++){
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
              primitive: "sphere",
              radius: 0.2,
            });
        
            enemyBullet.setAttribute("material", "color", "grey");
            var pos=els[i].getAttribute("position")
            enemyBullet.setAttribute("position", {
                x: pos.x+1.5,
                y: pos.y+3.5,
                z: pos.z,
              });
              var scene = document.querySelector("#scene");
              scene.appendChild(enemyBullet);
              //type 2 3.vector tooo store the pos
              var pos1=new THREE.Vector3()
              var pos2=new THREE.Vector3()

              //use worldPosition to store the player and enemy position
              var enemy=els[i].object3D
              var player=document.querySelector("#weapon").object3D

              player.getWorldPosition(pos1)
              enemy.getWorldPosition(pos2)

              var direction=new THREE.Vector3()

              direction.subVectors(pos1, pos2).normalize();
              
              enemyBullet.setAttribute("velocity", direction.multiplyScalar(10))
              
              enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "50",
              });

              var element=document.querySelector("#countLife")
              var playerLife=parseInt(element.getAttribute("text").value)
              enemyBullet.addEventListener("collide", function(e) {
                if (playerLife > 0) {
                    playerLife -= 1;
                    element.setAttribute("text", {
                        value: playerLife
                    });
                }
                if (playerLife <= 0) {
                    //show text
                    var txt = document.querySelector("#over");
                    txt.setAttribute("visible", true);

                    //remove tanks                        
                    var tankEl = document.querySelectorAll(".enemy")

                    for (var i = 0; i < tankEl.length; i++) {
                        scene.removeChild(tankEl[i])

                    }
                }
              });


      

        



        }
    }

    
})