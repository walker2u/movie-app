import { createOrUpdateUser, deleteUser } from '../../../lib/actions/user';
import { clerkClient } from '@clerk/nextjs/dist/types/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks'

export async function POST(req) {
    try {
        const evt = await verifyWebhook(req);
        const { id } = evt.data;
        const data = evt.data;
        const eventType = evt.type;
        console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
        console.log('Webhook payload:', evt.data);

        if (evt.type === 'user.created' || evt.type === 'user.updated') {
            console.log('create update webhook triggered');
            const user = await createOrUpdateUser(data.id, data.first_name, data.last_name, data.image_url, data.email_address);

            if (user && evt.type === 'user.created') {
                try {
                    const client = await clerkClient();
                    await client.users.updateUserMetadata(user.id, {
                        publicMetadata: {
                            userMongoId: user._id
                        }
                    });
                } catch (error) {
                    console.error('Error upadting clerk metadata :', error);
                }
            }
        }

        if (evt.type === 'user.deleted') {
            try {
                console.log('delete webhook triggered');
                await deleteUser(data.id);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}