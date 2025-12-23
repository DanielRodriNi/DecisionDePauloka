export const scenarios = {
    start: {
        title: "¿Qué puerta deseas tomar?",
        description: "Te encuentras ante una decisión crucial en tu aventura. Dos caminos se abren ante ti. ¿Hacia dónde te diriges?",
        options: [
            {
                text: "Opción con \"Coco\"",
                next: "coco_path",
                type: "positive"
            },
            {
                text: "Solos",
                next: "solos_path",
                type: "neutral"
            }
        ]
    },
    coco_path: {
        title: "¡Con Coco todo es mejor!",
        description: "Has elegido el camino de la alegría. Coco aparece moviendo la cola y la aventura se llena de energía perruna. ¿Qué quieres hacer ahora?",
        options: [
            {
                text: "Ir al parque",
                next: "park",
            },
            {
                text: "Darle un premio",
                next: "treat",
            }
        ]
    },
    solos_path: {
        title: "Momento de tranquilidad",
        description: "Has decidido seguir adelante en solitario. El silencio te rodea, permitiéndote reflexionar sobre tus próximos pasos. ¿Qué buscas?",
        options: [
            {
                text: "Explorar la ciudad",
                next: "city",
            },
            {
                text: "Descansar un poco",
                next: "rest",
            }
        ]
    }
    // More scenarios can be added here
};
