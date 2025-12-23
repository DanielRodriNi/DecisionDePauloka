export const scenarios = {
    start: {
        title: "¡ENHORABUENA!",
        image: "assets/VistaExterior.jpg",
        description: "¡HAS GANADO UN REGALO INCREÍBLE PARA TU CUMPLE! Nos vamos al Hotel Pintor el Greco en Toledo.\n\nDisfruta de un viaje al pasado en un edificio histórico, antigua tahona de la Catedral.",
        options: [
            { text: "Ver el plan detallado", next: "schedule" },
            { text: "¡Amo Toledo! Vamos", next: "main_choice" }
        ],
        confetti: true
    },
    schedule: {
        title: "El Plan: Sábado 21 Feb",
        image: "assets/VistaExterior.jpg",
        description: "Llegaremos el sábado por la mañana. Sobre las 14h dejaremos el hotel unas 3 horas (eso es inevitable, lo siento...), pero luego ya será COQUIN puro. ¿Te parece bien?",
        options: [
            { text: "¡Perfecto! Continuar", next: "hotel_info" },
            { text: "Mmm, ¿y esas 3 horas?", next: "schedule_alt" }
        ]
    },
    schedule_alt: {
        title: "Sobre esas 3 horas...",
        description: "Son obligatorias por logística, ¡pero se puede quedar una en el hotel descansando o dar un paseíto! Luego ya no nos separamos.",
        options: [
            { text: "Vale, acepto el trato", next: "hotel_info" }
        ]
    },
    hotel_info: {
        title: "Un lugar con historia",
        image: "assets/VistaExterior.jpg",
        description: "Ubicado en pleno centro de Toledo. La zona de desayunos albergó la antigua cámara acorazada de la Catedral.\n\nSus 57 habitaciones recientemente renovadas cuentan con un diseño único.",
        options: [
            { text: "¡Increíble! Continuar", next: "main_choice" }
        ]
    },
    main_choice: {
        title: "¿Cómo vamos?",
        description: "Aquí viene la gran decisión... ¿Cómo quieres disfrutar de este regalo?",
        options: [
            { text: "Con Coco (Opción Perros)", next: "coco_choice" },
            { text: "Solos (Opción Relax)", next: "solos_choice" }
        ]
    },
    coco_choice: {
        title: "¿¿ESTÁS SEGURA??",
        image: "assets/HabitacionSencilla.png",
        description: "Mira esta habitación... es la 'Sencilla'. Un poco fea, ¿no? ¿De verdad prefieres esto solo por traer a Coco?",
        shake: true,
        strobe: true,
        options: [
            { text: "Sí, Coco es lo primero", next: "coco_insist" },
            { text: "Mmm, quizás mejor solos...", next: "solos_choice" }
        ]
    },
    coco_insist: {
        title: "LO QUE TE PIERDES...",
        image: "assets/PremiumCueva.jpg",
        description: "Esta es la OTRA opción. Mira esa cueva, mira ese diseño... ¿Segura seguraaa?? ¿En serio quieres la sencilla?",
        shake: true,
        strobe: true,
        options: [
            { text: "¡QUE SÍ! Con Coco", next: "coco_ending" },
            { text: "Vale, la cueva es irresistible", next: "solos_choice" }
        ]
    },
    solos_choice: {
        title: "Opción Premium Cueva",
        image: "assets/PremiumCueva.jpg",
        description: "¡WOW! Mirad esta habitación. Espectacular. Pero... ¿no te da pena dejar a Coco? :(",
        options: [
            { text: "Pobrecito Coco... volvamos", next: "coco_choice" },
            { text: "Coco estará bien, ¡quiero la cueva!", next: "solos_ending" }
        ]
    },
    coco_ending: {
        title: "Final: Aventura Perruna",
        image: "assets/Coco1.jpg",
        description: "¡Conseguido! Toledo será testigo de los paseos de Coco. Será un cumple inolvidable (y ruidoso).",
        options: [
            { text: "Empezar de nuevo", next: "start" }
        ]
    },
    solos_ending: {
        title: "Final: Relax Absoluto",
        image: "assets/PremiumCueva.jpg",
        description: "Disfrutaréis de la paz histórica de Toledo. Eso sí, preparaos para la cara de pena de Coco al volver.",
        options: [
            { text: "Empezar de nuevo", next: "start" }
        ]
    }
};
