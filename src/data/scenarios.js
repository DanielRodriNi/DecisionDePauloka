export const scenarios = {
    start: {
        title: "¡ENHORABUENA!",
        carousel: [
            "assets/choice_celebration_toledo.png",
            "assets/VistaExterior_quality.png"
        ],
        description: "¡HAS GANADO UN REGALO INCREÍBLE PARA TU CUMPLE! Nos vamos al Hotel Pintor el Greco en Toledo.\n\nDisfruta de un viaje al pasado en un edificio histórico, antigua tahona de la Catedral.",
        theme: "party",
        options: [
            { text: "Ver el plan detallado", next: "schedule" },
            { text: "¡Amo Toledo! Vamos", next: "main_choice" }
        ],
        lighting: true
    },
    schedule: {
        title: "Aventura Gastronómica",
        image: "assets/toledo_feast_adventure.png",
        description: "Llegaremos el sábado 21 de febrero por la mañana.\n\nComeremos de lujo, aunque a las 14h HAY QUE DEJAR EL HOTEL 3 HORITAS.",
        theme: "adventure",
        options: [
            { text: "¡Qué buena pinta! Continuar", next: "hotel_info" },
            { text: "Mmm, ¿y esas 3 horas?", next: "schedule_alt" }
        ]
    },
    schedule_alt: {
        title: "Sobre esas 3 horas...",
        description: "Son obligatorias por logística, ¡pero si viene Coco, se puede quedar en el hotel descansando! Luego ya no nos separamos, ¡COQUIN puro!",
        theme: "adventure",
        options: [
            { text: "Vale, acepto el trato", next: "hotel_info" }
        ]
    },
    hotel_info: {
        title: "Un lugar con historia",
        image: "assets/Catedral.jpg",
        description: "Ubicado en pleno centro de Toledo. La zona de desayunos albergó la antigua cámara acorazada de la Catedral.\n\nSus 57 habitaciones recientemente renovadas cuentan con un diseño único.",
        theme: "adventure",
        options: [
            { text: "¡Increíble! Continuar", next: "minigame_intro" }
        ]
    },
    minigame_intro: {
        title: "¡DESAFÍO!",
        description: "¡ALTO! Para poder tomar una decisión, antes debes superar este desafío: RECOGE 5 COQUINES.",
        theme: "party",
        minigame: true,
        options: [] // The game will handle transition
    },
    main_choice: {
        title: "¿Cómo vamos?",
        description: "Aquí viene la gran decisión... ¿Cómo quieres disfrutar de este regalo?",
        theme: "romantic",
        options: [
            { text: "Con Coco (Opción Perros)", next: "coco_choice" },
            { text: "Solos (Opción Relax)", next: "solos_choice" }
        ]
    },
    coco_choice: {
        title: "¿¿ESTÁS SEGURA??",
        image: "assets/HabitacionSencilla.png",
        description: "Mira esta habitación... es la 'Sencilla'. Un poco fea, ¿no? ¿De verdad prefieres esto solo por traer a Coco?",
        theme: "tense",
        shake: true,
        strobe: true,
        options: [
            { text: "Sí, Coco es lo primero", next: "coco_insist" },
            { text: "Mmm, quizás mejor solos...", next: "solos_choice" }
        ]
    },
    coco_insist: {
        title: "LO QUE TE PIERDES...",
        image: "assets/PremiumCueva_quality.png",
        description: "Esta es la OTRA opción. Mira esa cueva, mira ese diseño... ¿Segura seguraaa?? ¿En serio quieres la sencilla?",
        theme: "tense",
        shake: true,
        strobe: true,
        options: [
            { text: "¡QUE SÍ! Con Coco", next: "coco_ending" },
            { text: "Vale, la cueva es irresistible", next: "solos_choice" }
        ]
    },
    solos_choice: {
        title: "Opción Premium Cueva",
        image: "assets/PremiumCueva_quality.png",
        description: "¡WOW! Mirad esta habitación. Espectacular. Pero... ¿no te da pena dejar a Coco? :(",
        theme: "sad",
        options: [
            { text: "Pobrecito Coco... volvamos", next: "coco_choice" },
            { text: "Coco estará bien, ¡quiero la cueva!", next: "solos_ending" }
        ]
    },
    coco_ending: {
        title: "Final: Aventura Perruna",
        image: "assets/Coco1.jpg",
        description: "¡Conseguido! Toledo será testigo de los paseos de Coco. Será un finde inolvidable (y ruidoso).",
        theme: "party",
        lighting: true,
        options: [
            { text: "Empezar de nuevo", next: "start" }
        ]
    },
    solos_ending: {
        title: "Final: Relax Absoluto",
        image: "assets/Coco3.jpg",
        description: "Disfrutarás de la paz histórica de Toledo. Eso sí, prepárate para la cara de pena de Coco al volver.",
        theme: "romantic",
        lighting: true,
        options: [
            { text: "Empezar de nuevo", next: "start" }
        ]
    }
};
