import { axiosInstance } from 'shared/api/apiInstance';

export class EventsPageApi {
    static async getAllUsers() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = [
                    {
                        id: 1,
                        name: 'Иван',
                        surname: 'Иванов',
                        patronymic: 'Иванович',
                    },
                    {
                        id: 2,
                        name: 'Петр',
                        surname: 'Петров',
                        patronymic: 'Петрович',
                    },
                    {
                        id: 3,
                        name: 'Сергей',
                        surname: 'Сергеев',
                        patronymic: 'Сергеевич',
                    },
                    {
                        id: 4,
                        name: 'Александр',
                        surname: 'Александров',
                        patronymic: 'Александрович',
                    },
                    {
                        id: 5,
                        name: 'Дмитрий',
                        surname: 'Дмитриев',
                        patronymic: 'Дмитриевич',
                    },
                    {
                        id: 6,
                        name: 'Михаил',
                        surname: 'Михайлов',
                        patronymic: 'Михайлович',
                    },
                    {
                        id: 7,
                        name: 'Андрей',
                        surname: 'Андреев',
                        patronymic: 'Андреевич',
                    },
                    {
                        id: 8,
                        name: 'Юрий',
                        surname: 'Юрьев',
                        patronymic: 'Юрьевич',
                    },
                    {
                        id: 9,
                        name: 'Николай',
                        surname: 'Николаев',
                        patronymic: 'Николаевич',
                    },
                    {
                        id: 10,
                        name: 'Илья',
                        surname: 'Ильин',
                        patronymic: 'Ильич',
                    },
                    {
                        id: 11,
                        name: 'Алексей',
                        surname: 'Алексеев',
                        patronymic: 'Алексеевич',
                    },
                    {
                        id: 12,
                        name: 'Владимир',
                        surname: 'Владимиров',
                        patronymic: 'Владимирович',
                    },
                    {
                        id: 13,
                        name: 'Антон',
                        surname: 'Антонов',
                        patronymic: 'Антонович',
                    },
                    {
                        id: 14,
                        name: 'Артем',
                        surname: 'Артемов',
                        patronymic: 'Артемович',
                    },
                    {
                        id: 15,
                        name: 'Арсений',
                        surname: 'Арсенов',
                        patronymic: 'Арсенович',
                    },
                    {
                        id: 16,
                        name: 'Василий',
                        surname: 'Васильев',
                        patronymic: 'Васильевич',
                    },
                    {
                        id: 17,
                        name: 'Григорий',
                        surname: 'Григорьев',
                        patronymic: 'Григорьевич',
                    },
                    {
                        id: 18,
                        name: 'Егор',
                        surname: 'Егоров',
                        patronymic: 'Егорович',
                    },
                    {
                        id: 19,
                        name: 'Игорь',
                        surname: 'Игорев',
                        patronymic: 'Игоревич',
                    },
                    {
                        id: 20,
                        name: 'Кирилл',
                        surname: 'Кириллов',
                        patronymic: 'Кириллович',
                    },
                    {
                        id: 21,
                        name: 'Леонид',
                        surname: 'Леонидов',
                        patronymic: 'Леонидович',
                    },
                ];
                resolve(users);
            }, 1000);
        });
    }
    // static async removeFromLibrary(bookId) {
    //     return axiosInstance
    //         .post(`/books/${bookId}/removeFromLibrary`)
    //         .catch(error => {
    //             console.error('Ошибка запроса:', error);
    //         });
    // }

    // static async addToLibrary(bookId) {
    //     return axiosInstance
    //         .post(`/books/${bookId}/addToLibrary`)
    //         .catch(error => {
    //             console.error('Ошибка запроса:', error);
    //         });
    // }

    // static async starBook(bookId) {
    //     return axiosInstance.post(`/books/${bookId}/star`).catch(error => {
    //         console.error('Ошибка запроса:', error);
    //     });
    // }

    // static async unstarBook(bookId) {
    //     return axiosInstance.post(`/books/${bookId}/unstar`).catch(error => {
    //         console.error('Ошибка запроса:', error);
    //     });
    // }

    // static async getBookInfo(bookId) {
    //     return axiosInstance.get(`/books/${bookId}`).catch(error => {
    //         console.error('Ошибка запроса:', error);
    //     });
    // }
}
