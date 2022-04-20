***!!! A détailler !!!***

*** JOUEUR ***

  * Déplacements au clavier (gamepad et tactile en projet)
  * Le joueur peut tirer sur des ennemis, percuter des ennemis
  * Tirs automatiques lors d'un appuie long sur une touche
  * Barre d'énergie qui se vide on hit
  * Si l'énergie tombe à 0, le joueur respawn et perd une vie (x3)
  * Invulnérabilité temporaire après perte de vie
  * Changement de phase (Blanc/Noir) qui influence les dégats pris et le scoring (cf Ikaruga)

***SCORING***

* Les projectiles de la même couleur que le joueur ajoutent des points au score global ET rechargent l'énergie du joueur
* Des projectiles de couleur différente au joueur lui font perdre de l'énergie
* Lorsque le joueur détruit un ennemi en tirant, il gagne le nombre de points de l'ennemi
* Le score de chaque "kill" pop du joueur et s'ajoute au score global

***ENNEMIS***
                                         
* Plusieurs types d'ennemis (Normaux et Boss)
* La capacité des ennemis à tirer est définie à la création de la wave
* Certains ennemis dropent des powerups pour le joueur de façon aléatoire selon un lootrate défini en GLOBAL
* Les vagues ont des patterns différents, influencant le comportement des ennemis qui la composent
* Si un ennemi percute le joueur, celui-ci perd une vie directement, sans recharger son énergie

***POWERUPS***     
* Chaque Powerup possède un timer
* Quadshoot : tire 4 bullets au lieu de 2
* Shield : rend invulnérable le joueur

***Si j'ai le temps...***

* Ghosts du vaisseau (pimp my ship)
* Leaderboard (pour bosser AJAX)
* Screen Shake (trouver dans quel draw()...)
* Twitch Waves (HS mais tellement classe...)
* Powerup Wingmen : deux petits vaisseaux aliés qui suivent le joueur et prennent les dégats à sa place