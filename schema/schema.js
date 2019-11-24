const graphql = require('graphql');
const L = require('lodash');

const Dish = require('../mongo-models/dish');
const Chef = require('../mongo-models/chef');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList
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
                return L.find(chefs, {
                    id: parent.chefsId
                });
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
                return L.filter(dish, {
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
                return L.find(dish, {
                    id: args.id
                });
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
                return L.find(chefs, {
                    id: args.id
                });
            }
        },
        dishes: {
            type: new GraphQLList(DishType),
            resolve(parent, args) {
                return dish
            }
        },
        chefs: {
            type: new GraphQLList(ChefType),
            resolve(parent, args) {
                return chefs
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
                    type: GraphQLString
                },
                country: {
                    type: GraphQLString
                },
                tasty: {
                    type: GraphQLBoolean
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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});