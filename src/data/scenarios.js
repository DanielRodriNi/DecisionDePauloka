export const scenarios = {
    start: {
        title: "¡ENHORABUENA!",
        image: "assets/VistaExterior.jpg",
        description: "¡HAS GANADO UN REGALO INCREÍBLE QUE SERÁ EXTENDIDO EL DÍA DE TU CUMPLE! Nos vamos al Hotel Pintor el Greco en Toledo.\n\nDisfruta de un viaje al pasado en un edificio histórico fundado en 1989, cuyas raíces fueron la antigua tahona de la Catedral.",
        options: [
            {
                text: "Saber más del hotel",
                next: "hotel_info"
            },
            {
                text: "¡Amo Toledo! Vamos",
                next: "main_choice"
            }
        ]
    },
    hotel_info: {
        title: "Un lugar con historia",
        image: "assets/VistaExterior.jpg",
        description: "Ubicado en pleno centro de Toledo, muy cerca de la Casa Museo del Greco. La zona de desayunos albergó la antigua cámara acorazada de la Catedral.\n\nSus 57 habitaciones recientemente renovadas cuentan con un diseño único. Más que descansar: aquí, conectas con el arte y la historia.",
        options: [
            {
                text: "¡Increíble! Continuar",
                next: "main_choice"
            }
        ]
    },
    main_choice: {
        title: "¿Cómo vamos?",
        description: "Aquí viene la gran decisión... ¿Cómo quieres disfrutar de este regalo?",
        options: [
            {
                text: "Con Coco (Opción Perros)",
                next: "coco_choice"
            },
            {
                text: "Solos (Opción Relax)",
                next: "solos_choice"
            }
        ]
    },
    coco_choice: {
        title: "¿¿ESTÁS SEGURA??",
        image: "assets/HabitacionSencilla.png",
        description: "Mira esta habitación... es la 'Sencilla'. Un poco fea, ¿no? ¿De verdad prefieres esto solo por traer a Coco?",
        shake: true,
        options: [
            {
                text: "Sí, Coco es lo primero",
                next: "coco_insist"
            },
            {
                text: "Mmm, quizás mejor solos...",
                next: "solos_choice"
            }
        ]
    },
    coco_insist: {
        title: "Piénsalo bien...",
        image: "assets/HabitacionSencilla.png",
        description: "Coco va a estar ladrando a las armaduras de Toledo. Y la habitación... bueno, ya la has visto. ¿Segurísima?",
        shake: true,
        options: [
            {
                text: "¡QUE SÍ! Con Coco",
                next: "coco_ending"
            },
            {
                text: "Vale, me has convencido, solos",
                next: "solos_choice"
            }
        ]
    },
    solos_choice: {
        title: "Opción Premium Cueva",
        image: "assets/PremiumCueva.jpg",
        description: "¡WOW! Mirad esta habitación. Espectacular. Pero... ¿no te da pena dejar a Coco? :(",
        options: [
            {
                text: "Pobrecito Coco... volvamos",
                next: "coco_choice"
            },
            {
                text: "Coco estará bien, ¡quiero la cueva!",
                next: "solos_ending"
            }
        ]
    },
    coco_ending: {
        title: "Final: Aventura Perruna",
        image: "assets/Coco1.jpg",
        description: "¡Conseguido! Toledo será testigo de los paseos de Coco. Será un cumple inolvidable (y ruidoso).",
        options: [
            {
                text: "Empezar de nuevo",
                next: "start"
            }
        ]
    },
    solos_ending: {
        title: "Final: Relax Absoluto",
        image: "assets/PremiumCueva.jpg",
        description: "Disfrutaréis de la paz histórica de Toledo. Eso sí, preparaos para la cara de pena de Coco al volver.",
        options: [
            {
                text: "Empezar de nuevo",
                next: "start"
            }
        ]
    }
};
