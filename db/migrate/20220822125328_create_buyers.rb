class CreateBuyers < ActiveRecord::Migration[7.0]
  def change
    create_table :buyers do |t|
      t.string :name
      t.string :address
      t.string :email
      t.string :cellphone
      t.string :payment

      t.timestamps
    end
  end
end
