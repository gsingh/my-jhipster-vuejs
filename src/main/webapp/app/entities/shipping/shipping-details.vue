<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="shipping">
                <h2 class="jh-entity-heading"><span>Shipping</span> {{shipping.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Shipping Date</span>
                    </dt>
                    <dd>
                        <span>{{shipping.shippingDate}}</span>
                    </dd>
                    <dt>
                        <span>Shift</span>
                    </dt>
                    <dd>
                        <span>{{shipping.shift}}</span>
                    </dd>
                    <dt>
                        <span>No Of Wagons</span>
                    </dt>
                    <dd>
                        <span>{{shipping.noOfWagons}}</span>
                    </dd>
                    <dt>
                        <span>No Of Trailers</span>
                    </dt>
                    <dd>
                        <span>{{shipping.noOfTrailers}}</span>
                    </dd>
                    <dt>
                        <span>Shipped Tonnage</span>
                    </dt>
                    <dd>
                        <span>{{shipping.shippedTonnage}}</span>
                    </dd>
                    <dt>
                        <span>Manager</span>
                    </dt>
                    <dd>
                        <div v-if="shipping.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: shipping.manager.id}}">{{shipping.manager.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="shipping.id" :to="{name: 'ShippingEdit', params: {shippingId: shipping.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./shipping-details.component.ts">
</script>
