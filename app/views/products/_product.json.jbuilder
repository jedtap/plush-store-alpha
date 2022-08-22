json.extract! product, :id, :name, :price, :alt, :img, :created_at, :updated_at
json.url product_url(product, format: :json)
