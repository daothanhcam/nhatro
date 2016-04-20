class AddRateNumToAddresses < ActiveRecord::Migration
  def change
    add_column :addresses, :rate_num, :integer
  end
end
