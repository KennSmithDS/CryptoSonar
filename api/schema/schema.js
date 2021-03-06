const graphql = require('graphql');
const User = require('../models/user');
const Wallet = require('../models/wallet');
const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        userName: { type: GraphQLString },
        userPassword: { type: GraphQLString },
        userSignedIn: { type: GraphQLBoolean },
        wallets: {
            type: new GraphQLList(WalletType),
            resolve(parent, args) {
                return Wallet.find({ userId: parent.id });
            }
        }
    })
});

const WalletType = new GraphQLObjectType({
    name: 'Wallet',
    fields: () => ({
        id: { type: GraphQLID },
        alias: { type: GraphQLString },
        address: { type: GraphQLString },
        userId: { type: GraphQLID }
    })
});

// root query for schema surfaced to server
const Query = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        userLogin: {
            type: UserType,
            args: {
                userName: { type: new GraphQLNonNull(GraphQLString) },
                userPassword: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return User.findOne({
                    userName: args.userName,
                    userPassword: args.userPassword
                })
            }
        },
        wallet: {
            type: WalletType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Wallet.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        wallets: {
            type: new GraphQLList(WalletType),
            resolve(parent, args) {
                return Wallet.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        userLogin: {
            type: UserType,
            args: {
                userName: { type: new GraphQLNonNull(GraphQLString) },
                userPassword: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return User.findOne({
                    userName: args.userName,
                    userPassword: args.userPassword
                })
            }
        },
        addUser: {
            type: UserType,
            args: {
                userName: { type: new GraphQLNonNull(GraphQLString) },
                userPassword: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    userName: args.userName,
                    userPassword: args.userPassword
                });
                return user.save();
            }
        },
        addWallet: {
            type: WalletType,
            args: {
                alias: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let wallet = new Wallet({
                    alias: args.alias,
                    address: args.address,
                    userId: args.userId
                });
                return wallet.save();
            }
        },
        updateWallet: {
            type: WalletType,
            args: {
                id: { type: GraphQLID },
                alias: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Wallet.findByIdAndUpdate( args.id, {
                    alias: args.alias,
                    address: args.address
                });
            } 
        },
        removeWallet: {
            type: WalletType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Wallet.findByIdAndDelete(args.id);
            }
        },
        removeUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return User.findByIdAndDelete(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});