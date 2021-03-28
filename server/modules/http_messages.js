export function getHttpMessages()
return {
    resource: {
        get: {},
        post: {
            success201: 'New resource added.',
            fail405: 'Resource creation failed.'
        },
        put: {},
        delete: {
            success204: 'resource deleted.',
            success400: 'unable to delete resource.'
        }
    },
    collection: {
        get: {
            success200: 'Collection retrieved.',
            failure400: 'Collection not retrieved.'
        },
        post: {
            success201: "New collection added.",
            failure405: "Unable to add collection."

        },
        put: {},
        delete: {
            success204: 'Collection deleted.',
            failure400: 'Unable to delete collection.'
        }
    }
}
