import { getDB } from "../../config/mongodb.js";

export default class PlacesModel{
    constructor(id,image,name,desc,story,route,state,places_to_visit,customer_review){
        this._id=id;
        this.image=image;
        this.name=name;
        this.desc=desc;
        this.story=story;
        this.route=route;
        this.state=state;
        this.places_to_visit=places_to_visit;
        this.customer_review=customer_review;  
        // this.rating=rating;
        // this.comments=comments;
    }

    // static getPlaces(){
       
    //     return places;
    // }

    // static getPlace(name){
    //     let place= places.find((e)=>e.name==name);
    //     return place;
    // }

}

// let places=[
//     new PlacesModel(1,
//         ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQw4Vs6FsFXQLh_N_e94PkDFbMnbNNPWSWtA&s',
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFD82Pefh7HSohA5IsvqqEYjgU_y3bTuemA&s',
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5vQ0tyVyjK4CrsyR6YGjeHRdXIDpK9cUKkA&s',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3-HhWGLeln8z1UjBpl24oz5rvvjArHcGPWw&s',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQ0GU5oS-LfEZkju499flHi7G-sZHQIkfZw&s'
//     ],
//         "Kedarnath","hello6"
//         ),
//     new PlacesModel(2,
//         ["https://www.agoda.com/wp-content/uploads/2023/02/Goa-overview-things-to-do-in-goa.jpg",
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6FFd_fqUpASH7gBmBzuws7h0okLjWfaS-Ng&s",
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbleuXmMCQoR7hYnbYoDkMz7Ys4xQzUPcMLA&s",
//             "https://img.veenaworld.com/wp-content/uploads/2021/03/6-Famous-Churches-of-Old-Goa-scaled.jpg",
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVAYlHBnHFL6q4GEkwuBLVuGCcp66CMyrwtQ&s"
//         ],
//         'Goa','Hello'
//         ),
//     new PlacesModel(3,['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG4g50imxA7zLleH2In9MmmdeRtUuj4R4oFA&s'],
//         'Aoyodhya','hello1'
//     ),
//     new PlacesModel(4,['https://t4.ftcdn.net/jpg/04/08/25/05/360_F_408250543_MVaEVGeWxb4FiFy7mEGKj8nfYkwoAZON.jpg'],
//     'Banaras','Hello3'),
//     new PlacesModel(5,
//        [ 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUn6EfwrZdkpryqQUBqG66VnAqzbIebL9FDA&s'],
//         'Ujjain','Hello2'
//     ),
//     new PlacesModel(
//         6,['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTErQ3wzV-iQoOfFyF1i0SkdhSbInsQ9hflmQ&s'],
//         'Mumbai','Hello5'
//     )
// ];