const graphql = require('graphql');
const L = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema
} = graphql;

var dish = [{
        name: 'Lamb Salad with Fregola',
        country: 'USA',
        tasty: true,
        id: '1'
    },
    {
        name: 'Belly pork & pineapple burritos',
        country: 'Mexico',
        tasty: true,
        id: '2'
    },
    {
        name: 'Momo',
        country: 'Nepal',
        tasty: true,
        id: '3'
    }
]

const DishType = new GraphQLObjectType({
    name: 'Dish',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        tasty: {
            type: GraphQLBoolean
        },
        country: {
            type: GraphQLString
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
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return L.find(dish, {
                    id: args.id
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});