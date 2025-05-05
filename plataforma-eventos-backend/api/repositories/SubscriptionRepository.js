const SubscriptionModel = require('../models/SubscriptionModel');

class SubscriptionRepository
{
    async subscribeToEvent(subscriptionInfo)
    {
        return await SubscriptionModel.create(subscriptionInfo);
    }
}

module.exports = SubscriptionRepository;