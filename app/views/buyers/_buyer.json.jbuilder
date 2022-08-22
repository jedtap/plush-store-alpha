json.extract! buyer, :id, :name, :address, :email, :cellphone, :payment, :created_at, :updated_at
json.url buyer_url(buyer, format: :json)
