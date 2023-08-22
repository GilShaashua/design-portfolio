import { httpService } from './http.service.js'

const API = 'entity'

export const entityService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
}
window.cs = entityService

async function query(filterBy) {
    return httpService.get(API, filterBy)
}

function getById(entityId) {
    return httpService.get(`${API}/${entityId}`)
}

async function remove(entityId) {
    return httpService.delete(`${API}/${entityId}`)
}
async function save(entity) {
    let savedEntity

    if (entity._id) {
        savedEntity = await httpService.put(`${API}/${entity._id}`, entity)
    } else {
        savedEntity = await httpService.post(API, entity)
    }

    return savedEntity
}

function getDefaultFilter() {
    return {
        location: '',
        checkIn: 0,
        checkOut: 0,
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
        label: '',
    }
}

// async function addEntityMsg(entityId, txt) {
//     const savedMsg = await httpService.post(`entity/${entityId}/msg`, { txt })
//     return savedMsg
// }

// function getEmptyEntity() {
//     return {
//         // name: "Ribeira Charming Duplex",
//         type: "House",
//         imgUrls: ["https://image.cnbcfm.com/api/v1/image/106758801-1603459526384-picture-perfect-beautiful-house-on-the-island-of-coronado-in-sunny-california-beautifully-landscaped_t20_6lJOrv.jpg?v=1603459593&w=740&h=416&ffmt=webp&vtcrop=y"],
//         // price: 80.00,
//         summary: "Fantastic duplex apartment...",
//         capacity: 8,
//         amenities: [
//             "TV",
//             "Wifi",
//             "Kitchen",
//             "Smoking allowed",
//             "Pets allowed",
//             "Cooking basics"
//         ],
//         labels: [
//             "Top of the world",
//             "Trending",
//             "Play",
//             "Tropical"
//         ],
//         host: {
//             _id: "u101",
//             fullname: "Davit Pok",
//             imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//         },
//         loc: {
//             country: "Portugal",
//             countryCode: "PT",
//             city: "Lisbon",
//             address: "17 Kombo st",
//             lat: -8.61308,
//             lng: 41.1413
//         },
//         reviews: [
//             {
//                 id: "madeId",
//                 txt: "Very helpful hosts. Cooked traditional...",
//                 rate: 4,
//                 by: {
//                     _id: "u102",
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//         ],
//         likedByUsers: ['mini-user']
//     }
// }
