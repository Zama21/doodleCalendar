import { axiosInstance } from 'shared/api/apiInstance';

export class CalendarApi {
    static async getAllEvents() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const events = [
                    {
                        id: 1,
                        title: 'Награждение за самый креативный способ прогулки занятий 1',
                        start: new Date(2024, 3, 12, 10, 0),
                        end: new Date(2024, 3, 12, 12, 0),
                        resourceId: ['1-222', '1-309'],
                        description:
                            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non repellendus natus nemo eius voluptatem itaque iure officia molestiae neque. Natus tempora tempore minus rem asperiores, soluta expedita laboriosam labore reiciendis iste',
                        members: [
                            'Иванов Иван Иванович',
                            'Петров Петр Петрович',
                            'Сидоров Сидор Сидорович',
                        ],
                    },
                    {
                        id: 2,
                        title: 'Лекция по истории России',
                        start: new Date(2024, 3, 19, 0, 0),
                        end: new Date(2024, 3, 19, 23, 59),
                        resourceId: ['2-222', '2-309'],
                        description: `Лекция по истории России - это мероприятие, на котором будет представлена информация о важных событиях, фигурах и периодах истории России. В рамках лекции будут рассмотрены ключевые моменты, которые оказали влияние на формирование современной России, такие как история древней Руси, царское правление, период Советского Союза, а также более современные события. Лекция может включать в себя обсуждение политических, социальных, экономических и культурных аспектов истории России. Также могут быть рассмотрены значимые исторические личности, их влияние на развитие страны и их вклад в формирование исторического наследия. Участники мероприятия могут получить более глубокое понимание исторических процессов, а также увидеть взаимосвязи между прошлыми событиями и современностью. Важным аспектом лекции может быть также обсуждение исторических уроков и их применимости в современном мире. Такая лекция может быть интересна как студентам и профессионалам в области истории и политологии, так и широкому кругу слушателей, желающих разбогатить свои знания об истории России.`,
                        members: [
                            'Смирнова Екатерина Владимировна',
                            'Козлов Александр Петрович',
                            'Морозова Ольга Ивановна',
                        ],
                    },
                    {
                        id: 3,
                        title: 'Семинар по физике',
                        start: new Date(2024, 3, 10, 12, 0),
                        end: new Date(2024, 3, 12, 12, 59),
                        resourceId: ['3-222', '3-309'],
                        description: 'Семинар по механике и термодинамике',
                        members: [
                            'Соколов Иван Сергеевич',
                            'Попова Анна Александровна',
                            'Кузнецов Дмитрий Павлович',
                        ],
                    },
                    {
                        id: 4,
                        title: 'Конференция по разработке программного обеспечения',
                        start: new Date(2024, 3, 15, 9, 0),
                        end: new Date(2024, 3, 15, 17, 0),
                        resourceId: ['4-222', '4-309'],
                        description:
                            'Конференция по разработке программного обеспечения предназначена для обсуждения последних тенденций и инноваций в сфере разработки программного обеспечения. На конференции будут представлены доклады и презентации по таким темам, как разработка веб-приложений, мобильных приложений, искусственный интеллект, большие данные и многое другое. Участники конференции смогут обменяться опытом, узнать о новейших технологиях и принять участие в дискуссиях по актуальным вопросам разработки программного обеспечения.',
                        members: [
                            'Петрова Ольга Александровна',
                            'Иванов Алексей Иванович',
                            'Сидорова Елена Петровна',
                        ],
                    },
                    {
                        id: 5,
                        title: 'Тренинг по управлению проектами',
                        start: new Date(2024, 3, 20, 14, 0),
                        end: new Date(2024, 3, 20, 16, 0),
                        resourceId: ['5-222', '5-309'],
                        description:
                            'Тренинг по управлению проектами предназначен для профессионалов в области управления проектами, а также для тех, кто только начинает свой путь в этой области. На тренинге будут рассмотрены основные принципы управления проектами, современные методики и инструменты, а также лучшие практики в этой области. Участники тренинга смогут расширить свои знания, обменяться опытом и улучшить свои навыки управления проектами.',
                        members: [
                            'Козлова Мария Алексеевна',
                            'Смирнов Антон Владимирович',
                            'Попов Игорь Сергеевич',
                        ],
                    },
                    {
                        id: 6,
                        title: 'Семинар по современным тенденциям в маркетинге',
                        start: new Date(2024, 3, 25, 9, 0),
                        end: new Date(2024, 3, 25, 12, 0),
                        resourceId: ['6-222', '6-309'],
                        description:
                            'Семинар по современным тенденциям в маркетинге предназначен для профессионалов в области маркетинга, рекламы и продаж, а также для всех, кто интересуется современными тенденциями в маркетинге. На семинаре будут рассмотрены последние изменения в мировой практике маркетинга, новые технологии и инструменты, а также успешные кейсы в сфере маркетинга и рекламы. Участники семинара смогут получить актуальные знания, обсудить с коллегами интересующие темы и сделать ценные контакты в области маркетинга.',
                        members: [
                            'Иванова Анна Сергеевна',
                            'Сидоров Дмитрий Владимирович',
                            'Петрова Людмила Андреевна',
                        ],
                    },
                    {
                        id: 7,
                        title: 'Презентация нового продукта',
                        start: new Date(2024, 3, 28, 15, 0),
                        end: new Date(2024, 3, 28, 17, 0),
                        resourceId: ['7-222', '7-309'],
                        description:
                            'Презентация нового продукта - это мероприятие, на котором будет представлен новый продукт или услуга. Презентация может включать в себя демонстрацию продукта, обсуждение его особенностей, преимуществ и возможных применений. Участники презентации смогут узнать о новинках, задать вопросы, выразить свое мнение и получить подробную информацию о новом продукте. Презентация нового продукта может быть интересна как для потенциальных клиентов, так и для партнеров компании, журналистов и общественности.',
                        members: [
                            'Смирнов Михаил Александрович',
                            'Козлова Екатерина Сергеевна',
                            'Попов Андрей Павлович',
                        ],
                    },
                    {
                        id: 8,
                        title: 'Концерт классической музыки',
                        start: new Date(2024, 3, 5, 18, 0),
                        end: new Date(2024, 3, 5, 20, 0),
                        resourceId: ['8-222', '8-309'],
                        description: 'Концерт классической музыки',
                        members: [
                            'Иванова Мария Алексеевна',
                            'Петров Александр Иванович',
                            'Сидорова Елена Петровна',
                        ],
                    },
                    {
                        id: 9,
                        title: 'Встреча выпускников',
                        start: new Date(2024, 3, 10, 19, 0),
                        end: new Date(2024, 3, 10, 22, 0),
                        resourceId: ['9-222', '9-309'],
                        description: 'Встреча выпускников',
                        members: [
                            'Козлова Ольга Александровна',
                            'Смирнов Алексей Владимирович',
                            'Попова Анна Сергеевна',
                        ],
                    },
                    {
                        id: 10,
                        title: 'Тренировка по йоге',
                        start: new Date(2024, 3, 7, 8, 0),
                        end: new Date(2024, 3, 7, 9, 0),
                        resourceId: ['10-222', '10-309'],
                        description: 'Тренировка по йоге',
                        members: [
                            'Иванова Анна Сергеевна',
                            'Сидорова Дмитрий Владимирович',
                            'Петрова Людмила Андреевна',
                        ],
                    },
                    {
                        id: 11,
                        title: 'Тренировка по пилатесу',
                        start: new Date(2024, 3, 18, 17, 0),
                        end: new Date(2024, 3, 18, 18, 0),
                        resourceId: ['11-222'],
                        description:
                            'Тренировка по пилатесу для укрепления мышц и гибкости',
                        members: [
                            'Иванова Мария Алексеевна',
                            'Петров Александр Иванович',
                            'Сидорова Елена Петровна',
                        ],
                    },
                    {
                        id: 12,
                        title: 'Выставка современного искусства',
                        start: new Date(2024, 3, 20, 10, 0),
                        end: new Date(2024, 3, 25, 18, 0),
                        resourceId: ['12-222', '12-309', '12-415'],
                        description:
                            'Выставка современного искусства с работами современных художников',
                        members: [
                            'Козлова Ольга Александровна',
                            'Смирнов Алексей Владимирович',
                            'Попова Анна Сергеевна',
                        ],
                    },
                    {
                        id: 13,
                        title: 'Футбольный турнир',
                        start: new Date(2024, 3, 14, 14, 0),
                        end: new Date(2024, 3, 14, 18, 0),
                        resourceId: [],
                        description:
                            'Футбольный турнир среди студентов и преподавателей',
                        members: [
                            'Иванова Анна Сергеевна',
                            'Сидорова Дмитрий Владимирович',
                            'Петрова Людмила Андреевна',
                        ],
                    },
                    {
                        id: 14,
                        title: 'Конференция по экологии',
                        start: new Date(2024, 4, 5, 9, 0),
                        end: new Date(2024, 4, 5, 17, 0),
                        resourceId: ['14-222'],
                        description:
                            'Конференция по экологии для обсуждения экологических проблем и решений',
                        members: [
                            'Иванова Маргарита Алексеевна',
                            'Петров Александр Иванович',
                            'Сидорова Елена Петровна',
                        ],
                    },
                    {
                        id: 15,
                        title: 'Мастер-класс по кулинарии',
                        start: new Date(2024, 4, 10, 15, 0),
                        end: new Date(2024, 4, 10, 18, 0),
                        resourceId: ['15-222', '15-309'],
                        description:
                            'Мастер-класс по кулинарии с приготовлением популярных блюд',
                        members: [
                            'Козлова Ольга Александровна',
                            'Смирнов Алексей Владимирович',
                            'Попова Анна Сергеевна',
                        ],
                    },
                    {
                        id: 16,
                        title: 'Встреча киноклуба',
                        start: new Date(2024, 4, 15, 18, 0),
                        end: new Date(2024, 4, 15, 20, 0),
                        resourceId: [],
                        description:
                            'Встреча киноклуба с обсуждением фильма и кинематографа',
                        members: [
                            'Иванова Анна Сергеевна',
                            'Сидорова Дмитрий Владимирович',
                            'Петрова Людмила Андреевна',
                        ],
                    },
                ];
                resolve(events);
            }, 2000);
        });
    }
}
