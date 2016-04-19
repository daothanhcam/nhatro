class CreateUserRates < ActiveRecord::Migration
  def change
    create_table :user_rates do |t|
      t.references :user, index: true
      t.references :address, index: true
      t.integer :point, null: false
    end
  end
end
