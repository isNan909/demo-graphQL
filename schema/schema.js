const graphql = require('graphql');

const Dish = require('../mongo-models/dish');
const Chef = require('../mongo-models/chef');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const DishType = new GraphQLObjectType({
    name: 'Dish',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        tasty: {
            type: GraphQLBoolean
        },
        country: {
            type: GraphQLString
        },
        chefs: {
            type: ChefType,
            resolve(parent, args) {
                return Chef.findById(parent.chefsId)
            }
        }
    })
});

const ChefType = new GraphQLObjectType({
    name: 'chefs',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        rating: {
            type: GraphQLFloat
        },
        dish: {
            type: new GraphQLList(DishType),
            resolve(parent, args) {
                return Dish.find({
                    chefsId: parent.id
                })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        dish: {
            type: DishType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Dish.findById(args.id);
            }
        },
        chefs: {
            type: ChefType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Chef.findById(args.id);
            }
        },
        dishes: {
            type: new GraphQLList(DishType),
            resolve(parent, args) {
                return Dish.find({});
            }
        },
        chefs: {
            type: new GraphQLList(ChefType),
            resolve(parent, args) {
                return Chef.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDish: {
            type: DishType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                country: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                tasty: {
                    type: new GraphQLNonNull(GraphQLBoolean)
                }
            },
            resolve(parent, args) {
                let dish = new Dish({
                    name: args.name,
                    country: args.country,
                    tasty: args.tasty,
                });
                return dish.save();
            }
        },
        addChef: {
            type: ChefType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                rating: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let chef = new Chef({
                    name: args.name,
                    rating: args.rating
                });
                return chef.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});