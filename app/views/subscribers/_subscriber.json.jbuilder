json.extract! subscriber, :id, :nickname, :email, :created_at, :updated_at
json.url subscriber_url(subscriber, format: :json)
