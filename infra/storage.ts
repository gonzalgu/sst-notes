export const bucket = new sst.aws.Bucket("Uploads");

//create a dynamodb table
export const table = new sst.aws.Dynamo("Notes", {
    fields:{
        userId: "string",
        noteId: "string",
    },
    primaryIndex: {
        hashKey: "userId",
        rangeKey: "noteId"
    },
});
