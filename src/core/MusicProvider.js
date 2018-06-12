/**
 * Created by mohitbhansali on 10/06/18.
 */

export default class MusicProvider {

    static sharedProvider() {
        if(!MusicProvider.instance) {
            MusicProvider.instance = new MusicProvider();
        }
        return MusicProvider.instance;
    }

    configure() {
        window.MusicKit.configure({
            developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRNVk05WEJQTUMifQ.eyJpYXQiOjE1Mjg1Mzg0NjQsImV4cCI6MTU0NDI2MzI2NCwiaXNzIjoiRjdBMlVHNUxMNCJ9.2zsjC-uKQNrmELwIVysvOGbQT8qssehIHfyVHQyD6rmyXufHfo6wzN2cZzxXW6z_DO6yfCn71Ifzb6QgPnfw0A',
            app: {
                name: 'Appsfly Music',
                build: '2018.6.9'
            }
        });
    }

    getMusicInstance() {
        return window.MusicKit.getInstance();
    }
}