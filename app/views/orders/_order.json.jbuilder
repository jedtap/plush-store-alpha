json.extract! order, :id, :quantity, :price, :subtotal, :created_at, :updated_at
json.url order_url(order, format: :json)
