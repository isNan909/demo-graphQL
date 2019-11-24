const graphql = require('graphql');
const L = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat
} = graphql;

var dish = [{
        id: '1',
        name: 'Lamb Salad with Fregola',
        country: 'USA',
        tasty: true,
        chefsId: '1'
    },
    {
        id: '2',
        name: 'Belly pork & pineapple burritos',
        country: 'Mexico',
        tasty: true,
        chefsId: '2'
    },
    {
        id: '3',
        name: 'Momo',
        country: 'Nepal',
        tasty: true,
        chefsId: '3'
    }
]


var chefs = [{
        id: '1',
        name: 'Haary Salmon',
        rating: '3.5'
    },
    {
        id: '2',
        name: 'Jack Narito',
        rating: '4'
    },
    {
        id: '3',
        name: 'Kancha Babu',
        rating: '4.5'
    }
]

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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});