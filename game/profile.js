import * as three from '../src/three.js'
import getMeshImage from './assetGenerator.js'


var Txt = new three.TextureLoader()

var Skins = {
  
  skin1: {
    name: "Barbarian",
    type: "tank",
    unlockedAtLevel: 0, 
    price: 0,
    src: "assets/images/barbarian.png",
    des: "Barbarian is a warrior from the past whose strength can severe a large bear. They promised to protect their land and families in order to restore peace and harmony. They are associated with the Earth element and they are at their potential in this kind of element. "
    
  },
  skin2: {
    name: "Knight",
    type: "tank",
    unlockedAtLevel: 20,
    price: 20000,
    src: "assets/images/knight.png",
    des: "Knight is the bravest and strongest and prideful warrior of England who protects and abide the King. They swore to protect their land and bring peace into their Kingdom. Use this hero with the fire Element to eliminate enemies with precise attacks."
    
  },
  skin3: {
    name: "Mage",
    type: 'range',
    unlockedAtLevel: 35,
    price: 30000,
    src: "assets/images/mage.png",
    des: "Mages are unique as they are the magician of this world, they bring things into whole different level. They see the world as an extension of their mind and spirit. They can do everything they want and do what they want. Associate this Hero with the water element to use this Hero's potential."
    
  },
  skin4: {
    name: "Rogue",
    type: 'range',
    price: 50000,
    unlockedAtLevel: 50,
    src: "assets/images/rogue.png",
    des: "Rogue is the harsh Hero, they are the rangers of the forest. They are free and savages on their lands, but they are also prideful when it comes for their family and friends. They hunt for prey and provide needs to their society. Use this hero associated with the Wind Element to use this Hero's potential."
  }
}


var Swords = {
  sword1: {
    img: "assets/images/axe.png",
    image: null,
    mesh: new three.Group(),
    name: "Axe",
    attack: "20%",
    speed: "10%",
    damage: "30",
    renderMesh: function(gr) {
      getMeshImage(this.img, this.mesh)
      this.image = new Image()
      this.image.src = this.img
    },
    getMesh: function() {
      return this.mesh
    },
    getImg: function() {
      return this.image
    }
  },
  sword2: {
    img: "assets/images/axe2.png",
    image: null,
    mesh: new three.Group(),
    name: "Axe 2 🪓",
    attack: "20%",
    speed: "10%",
    damage: "30",
    renderMesh: function(gr) {
      getMeshImage(this.img, this.mesh)
      this.image = new Image()
      this.image.src = this.img
    },
    getMesh: function() {
      return this.mesh
    },
    getImg: function() {
      return this.image
    }
  },
  sword3: {
    img: "assets/images/kiris.png",
    image: null,
    mesh: new three.Group(),
    name: "Kiris 🐍",
    attack: "20%",
    speed: "10%",
    damage: "30",
    renderMesh: function(gr) {
      getMeshImage(this.img, this.mesh)
      this.image = new Image()
      this.image.src = this.img
    },
    getMesh: function() {
      return this.mesh
    },
    getImg: function() {
      return this.image
    }
  },
  sword4: {
    img: "assets/images/trident.png",
    image: null,
    mesh: new three.Group(),
    name: "Trident 🔱",
    attack: "20%",
    speed: "10%",
    damage: "30",
    renderMesh: function(gr) {
      getMeshImage(this.img, this.mesh)
      this.image = new Image()
      this.image.src = this.img
    },
    getMesh: function() {
      return this.mesh
    },
    getImg: function() {
      return this.image
    }
  },
  sword5: {
    img: "assets/images/saber.png",
    image: null,
    mesh: new three.Group(),
    name: "Saber 🗡️",
    attack: "20%",
    speed: "10%",
    damage: "30",
    renderMesh: function(gr) {
      getMeshImage(this.img, this.mesh)
      this.image = new Image()
      this.image.src = this.img
    },
    getMesh: function() {
      return this.mesh
    },
    getImg: function() {
      return this.image
    }
  },
  sword6: {
    img: "assets/images/king.png",
    image: null,
    mesh: new three.Group(),
    name: "King's Sword",
    attack: "20%",
    speed: "10%",
    damage: "30",
    renderMesh: function(gr) {
      getMeshImage(this.img, this.mesh)
      this.image = new Image()
      this.image.src = this.img
    },
    getMesh: function() {
      return this.mesh
    },
    getImg: function() {
      return this.image
    }
  },
  sword7: {
    img: "assets/images/magic.png",
    image: null,
    mesh: new three.Group(),
    name: "Magic Sword",
    attack: "20%",
    speed: "10%",
    damage: "30",
    renderMesh: function(gr) {
      getMeshImage(this.img, this.mesh)
      this.image = new Image()
      this.image.src = this.img
    },
    getMesh: function() {
      return this.mesh
    },
    getImg: function() {
      return this.image
    }
  },
  sword8: {
    img: "assets/images/alien.png",
    image: null,
    mesh: new three.Group(),
    name: "Alien Sword",
    attack: "20%",
    speed: "10%",
    damage: "30",
    renderMesh: function(gr) {
      getMeshImage(this.img, this.mesh)
      this.image = new Image()
      this.image.src = this.img
    },
    getMesh: function() {
      return this.mesh
    },
    getImg: function() {
      return this.image
    }
  },
  sword9: {
    img: "assets/images/ripper.png",
    image: null,
    mesh: new three.Group(),
    name: "Grim Ripper",
    attack: "20%",
    speed: "10%",
    damage: "30",
    renderMesh: function(gr) {
      getMeshImage(this.img, this.mesh)
      this.image = new Image()
      this.image.src = this.img
    },
    getMesh: function() {
      return this.mesh
    },
    getImg: function() {
      return this.image
    }
  }
}



var Modes = {
  beginner: {
    color: "#47FF8BAB",
    stat: {
      speed: 10,
      damage: 10,
      count: 30,
      life: 10
    }
  },
  pro: {
    color: "#1BFDE4AB",
    stat: {
      speed: 20,
      damage: 30,
      count: 50,
      life: 25
    }
  },
  expert: {
    color: "#FD651BA1",
    stat: {
      speed: 40,
      damage: 50,
      count: 70,
      life: 40
    }
  }
}

var profile = {

  skin: "skin1",
  sword: "sword1",
  element: "fire",
  mode: "beginner",
  zombieCount: 10,
  firstSkillOpen: true,
  secondSkillOpen: true,
  thirdSkillOpen: true,
  coins: 100,
  health: 10000,

  // Game Info
  level: 60,
  zombieHealth: 500,
  model: "Knight",
  skinsStatus: {
    Barbarian: true,
    Knight: true,
    Mage: true,
    Rogue:true
  }

}



var ModelItems = {
  Barbarian: {
    Objects: [
   /* "Mug",

    "2H_Axe",
   "Barbarian_Round_Shield",
    "Barbarian_Cape",
    "Barbarian_Hat",
    "1H_Axe_Offhand"*/
    ],
    Attacks: [
      "1H_Melee_Attack_Chop",
"1H_Melee_Attack_Slice_Diagonal",
"1H_Melee_Attack_Slice_Horizontal",
"1H_Melee_Attack_Stab",
"2H_Melee_Attack_Spinning"
      ]
  },
  Mage: {
    Objects: [
    /*  "Mage_Hat",
      "Mage_Cape",
      "2H_Staff",*/
      "1H_Wand",
      "Spellbook",
      "Spellbook_open"
      ],
    Attacks: [
  "2H_Ranged_Shoot",
  "Spellcast_Long"
        ]
  },
  Rogue:
  {
    Objects: [

    //   "Rogue_Cape"
       "Throwable",
    //   "1H_Crossbow",
     //  "2H_Crossbow",
       "Knife",
       "Knife_Offhand"
       ],
       Attacks: [
         "2H_Ranged_Shoot"
         ]

  },

  Knight: {
    Objects: [
  /*  "Knight_Cape",
    "Knight_Helmet",
    "1H_Sword",
    "2H_Sword",
    "1H_Sword_Offhand",
    "Round_Shield",
    "Spike_Shield",
    "Rectangle_Shield",
    "Badge_Shield",
*/
    ],
    Attacks: [
      "1H_Melee_Attack_Chop",
"1H_Melee_Attack_Slice_Diagonal",
"1H_Melee_Attack_Slice_Horizontal",
"1H_Melee_Attack_Stab"
      ]

  }

}


/*

ANIMATIONS

Idle
Walking_A
Walking_B
Walking_C
Walking_Backward
Running_A
Running_B
Running_Strafe_Right
Running_Strafe_Left
Jump_Full_Short
Jump_Full_Long
Jump_Start
Jump_Idle
Jump_Land
Dodge_Right
Dodge_Left
Dodge_Forward
Dodge_Backward
Pickup
Use Item
Throw
Interact
Cheer
Hit_A
Hit_B
Death_A
Death_A_Pose
Death_B
Death_B_Pose
1H_Melee_Attack_Chop
1H_Melee_Attack_Slice_Diagonal
1H_Melee_Attack_Slice_Horizontal
1H_Melee_Attack_Stab
2H_Melee_Idle
2H_Melee_Attack_Chop
2H_Melee_Attack_Slice
2H_Melee_Attack_Stab
2H_Melee_Attack_Spin
2H_Melee_Attack_Spinning
Dualwield_Melee_Attack_Chop
Dualwield_Melee_Attack_Slice
Dualwield_Melee_Attack_Stab
Unarmed_Idle
Unarmed_Pose
Unarmed_Melee_Attack_Punch_A
Unarmed_Melee_Attack_Punch_B
Unarmed_Melee_Attack_Kick
Block
Blocking
Block_Hit
Block_Attack
1H_Ranged_Aiming
1H_Ranged_Shoot
1H_Ranged_Shooting
1H_Ranged_Reload
2H_Ranged_Aiming
2H_Ranged_Shoot
2H_Ranged_Shooting
2H_Ranged_Reload
Spellcast_Shoot
Spellcast_Raise
Spellcast_Long
Spellcast_Charge
Lie_Down
Lie_Idle
Lie_Pose
Lie_StandUp
Sit_Chair_Down
Sit_Chair_Idle
Sit_Chair_Pose
Sit_Chair_StandUp
Sit_Floor_Down
Sit_Floor_Idle
Sit_Floor_Pose
Sit_Floor_StandUp



*/




// update local storage 

var Profile = localStorage.getItem("profile")

if (Profile === null) {

  localStorage.setItem("profile", JSON.stringify(profile))
  Profile = JSON.parse(localStorage.getItem("profile"))

} else {
  Profile = JSON.parse(localStorage.getItem("profile"))
}



var Achievements = {
  level1: {
    done: true,
    title: "First Day, Yey!",
    icon: "🔫",
    description: "Survive and pass the first level of the game.",
    prize: "100 Coins",
    command: function() {
      Profile.coins += 100
    }
  },
  level2: {
    done: false,
    title: "50 Knockouts",
    icon: "🧟",
    description: "Subdue at least 50 zombies, slay!!",
    prize: "500 Coins",
    command: function() {
      Profile.coins += 500
    }
  },
  level3: {
    done: false,
    title: "Damn Flyers!",
    icon: "🦇",
    description: "First defeat of Flyer",
    prize: "600 Coins",
    command: function() {
      Profile.coins += 600
    }
  },
  level4: {
    done: false,
    title: "Use of first skill",
    icon:"⚔️",
    description: "Fr! Fr! First Skill the best! Use first skill for the first time.",
    prize: "2nd Skill Unlocked",
    command: function() {
      Profile.secondSkillOpen = true
    }
  },
  level5: {
    done: false,
    title: "Gear 3rd!",
    icon: "💪",
    description: "Unlocked first and second Skills!, huyyah",
    prize: "3rd Skill",
    command: function() {
      Profile.thirdSkillOpen = true 
    }
  },
  level6: {
    done: false,
    title: "300 Hits!",
    icon:"👊",
    description: "accumulate 300 Hits in a single game session",
    prize: "3000 Coins",
    command: function() {
      Profile.coins += 3000
    }
  },
  level7: {
    done: false,
    title: "Mage Time!",
    icon: "🛸",
    description: "Attack 5 flyers consecutively, subdue them!",
    prize: "Mage Hero",
    command: function() {
      Profile.hero.mage = true
    }
  }
  
}


export { Achievements, Skins, Swords, Profile, Modes, ModelItems }