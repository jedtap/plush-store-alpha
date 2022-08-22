class Product < ApplicationRecord
  has_many :orders
  has_many :buyers, through: :orders
end
