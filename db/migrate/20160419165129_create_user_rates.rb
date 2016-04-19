class CreateUserRates < ActiveRecord::Migration
  def change
    create_table :user_rates do |t|
      t.references :user_id, index: true
      t.references :address_id, index: true
      t.integer :rate, null: false
    end
  end
end
